import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response,) => {
    try {

        const user = await UserServices.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        console.log(error);
        res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: "Failed to create user",
        });
    }
}

export const UserController = {
    createUser
}

