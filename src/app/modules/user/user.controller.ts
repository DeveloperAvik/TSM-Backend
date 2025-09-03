import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsyncs";
import { success } from "zod";



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)
    res.status(httpStatus.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user
    });
})


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();

    res.status(httpStatus.OK).json({
        success: true,
        message: "All users Retrived Successfully",
        data: users
    })
})



export const UserController = {
    createUser,
    getAllUsers
}

