import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    // Check if user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            `User with email ${email} already exists`
        );
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(
        password as string,
        Number(envVars.BCRYPT_SALT_ROUND)
    );

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email!,
    };

    const user = await User.create({
        email,
        password: hashedPassword,
        auths: [authProvider],
        ...rest,
    });

    // Exclude password before returning
    const { password: _, ...safeUser } = user.toObject();
    return { user: safeUser };
};

const updateUser = async (
    userId: string,
    payload: Partial<IUser>,
    decodedToken: JwtPayload
) => {
    const ifUserExist = await User.findById(userId);

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
    }

    // Role-based restrictions
    if (payload.role) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }

        if (
            payload.role === Role.SUPERADMIN &&
            decodedToken.role === Role.ADMIN
        ) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
        if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
        }
    }

    // Rehash password if updating
    if (payload.password) {
        payload.password = await bcryptjs.hash(
            payload.password,
            Number(envVars.BCRYPT_SALT_ROUND)
        );
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });

    return newUpdatedUser;
};

const getAllUsers = async () => {
    const users = await User.find({});
    const totalUsers = await User.countDocuments();

    return {
        data: users.map((u) => {
            const { password, ...safeUser } = u.toObject();
            return safeUser;
        }),
        meta: {
            total: totalUsers,
        },
    };
};

export const UserServices = { createUser, getAllUsers, updateUser };
