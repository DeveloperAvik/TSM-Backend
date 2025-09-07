import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsyncs";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In successfully",
        data: loginInfo
    })
})


export const AuthControllers = {
    credentialsLogin
}