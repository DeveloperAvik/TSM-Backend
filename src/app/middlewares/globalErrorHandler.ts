import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = `Something Went Wrong`;

    if (err.code === 11000) {
        console.log("Duplicate error", err.message);
        const duplicate = err.message.match(/"([^"]*)"/)
        statusCode = 400;
        message= `${duplicate} alredy exist`
    }

    else if (err.name === "CastError") {
        statusCode = 400;
        message: "Invalid MongoDB ObjectId. Please provide a valid id"
    }  else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: envVars.nodeEnv === "development" ? err.stack : null
    })
}