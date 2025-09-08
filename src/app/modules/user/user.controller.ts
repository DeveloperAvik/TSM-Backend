import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsyncs";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { isVerified } from './user.interface';



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: result
    })
});



const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload;


    const verifiedToken = req.user

    const payload = req.body;


    const result = await UserServices.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated successfully",
        data: result
    })
});


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();

        sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Retrived successfully",
        data: result.data,
        meta: result.meta,
    })
})



export const UserController = {
    createUser,
    updateUser,
    getAllUsers
}

