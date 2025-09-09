import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsyncs";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body);


    res.cookie("accessToken", loginInfo.accessToken, { httpOnly: true, secure: false })
    res.cookie("refreshToken", loginInfo.refreshToken, { httpOnly: true, secure: false })

    setAuthCookie(res, loginInfo)

    // res.cookie("accessToken", loginInfo.accessToken), {
    //     httpOnly: true,
    //     secure: false
    // }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged In successfully",
        data: loginInfo
    })
});



const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Refresh Token from cookies")
    }


    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken)

    // res.cookie("accessToken", tokenInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })

    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "New Access Token Retrive Successfully",
        data: tokenInfo
    })
})



const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged out successfully",
        data: null
    })
})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken,
    logOut
}