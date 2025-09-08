import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import AppError from "../errorHelpers/AppError";
import { Role } from "../modules/user/user.interface";

export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token recived")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload



        // if(!verifyToken) {
        //     throw new AppError(403, "You are not authorized in my life also ...")
        // }

        const userRole = (verifiedToken.Role || verifiedToken.role)?.toLowerCase();

        if (userRole !== Role.SUPERADMIN && !authRoles.includes(userRole as Role)) {
            throw new AppError(403, "You are not permitted to view this route");
        }

        req.user = verifiedToken


        console.log(verifiedToken);

        next();

    } catch (err) {
        next(err)
    }
}
