import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
import { router } from "./app/routes";
import { success } from "zod";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import httpStatus from 'http-status-codes';
import notFound from "./app/middlewares/notFound";

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "welcome to the Tour Management System API"
    })
});

app.use(globalErrorHandler);

app.use(notFound);


export default app;