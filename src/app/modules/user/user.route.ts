import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "./user.controller";
import createUserZodSchema from "./user.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from "../../errorHelpers/AppError";
import { Role } from './user.interface';
import { envVars } from "../../config/env";
import { verifyToken } from "../../utils/jwt";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();



router.post("/register", validateRequest(createUserZodSchema), UserController.createUser);
router.patch("/:id", checkAuth(...Object.values(Role)), UserController.updateUser);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPERADMIN), UserController.getAllUsers);

export const UserRoutes = router;
