import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const statusCode = 500;
    const message =  `Something Went Wrong ${err.message}`;

    res.json(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.nodeEnv === "development" ? err.stack : null
    })
}