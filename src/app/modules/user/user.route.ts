import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../../errorHelpers/AppError";
import { Role } from "./user.interface";
import { envVars } from "../../config/env";
import { verifyToken } from "../../utils/jwt";

const router = Router();

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {

        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token recived")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET)



        // if(!verifyToken) {
        //     throw new AppError(403, "You are not authorized in my life also ...")
        // }

        if ((verifiedToken as JwtPayload).role !== Role.ADMIN || Role.SUPERADMIN) {
            throw new AppError(403, "You are not permitted to view this route")
        }

        console.log(verifiedToken);

        next();

    } catch (err) {
        next(err)
    }
}




router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);

router.get("/all-users", checkAuth, UserController.getAllUsers);

export const UserRoutes = router;
