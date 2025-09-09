import AppError from "../../errorHelpers/AppError";
import { isActive, isDeleted, IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { createUserTokens } from "../../utils/userTokes";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User doesnot Exist")
    }

    const isPasswordMatch = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Passoerd")
    }


    const userTokens = createUserTokens(isUserExist)
    const { password: pass, ...rest } = isUserExist.toObject();


    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFREESH_SECRET) as JwtPayload

    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User doesnot Exist")
    }

    if (isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `user is ${isUserExist.isActive}`)
    }

    if (isUserExist.isDeleted === isDeleted.DELETED) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is deleted")
    }


    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_EXPIRES, envVars.JWT_REFREESH_EXPIRED)


    // const userTokens = createUserTokens(isUserExist)
    // const { password: pass, ...rest } = isUserExist.toObject();


    return {
        accessToken
    }
}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}