import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";

const createUser = async (req: Request, res: Response, next : NextFunction) => {
    try {

        // throw new Error("Fake Error")

        // throw new AppError(httpStatus.BAD_REQUEST, "fake error")

        const user = await UserServices.createUser(req.body)

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "User created successfully",
            data: user
        });

    } catch (err : any) {
        console.log(err);
        // res.status(httpStatus.BAD_REQUEST).json({
        //     message: `Failed to create user ${err.message} from user controller`,
        //     err,
        // });

        next(err)
    }
}

export const UserController = {
    createUser
}

