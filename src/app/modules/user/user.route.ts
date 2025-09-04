import { Request, Response, NextFunction, Router } from "express";
import { UserController } from "./user.controller";
import z from "zod";

const router = Router();

const createUserSchema = z.object({
    name: z.string()
        .min(2, { message: "Name too short. Minimum 2 characters required." })
        .max(50, { message: "Name too long. Maximum 50 characters allowed." })
        .nonempty({ message: "Name is required." }),

    email: z.string()
        .email({ message: "Invalid email format." })
        .nonempty({ message: "Email is required." }),

    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number." }),

    phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }).optional(),

    address: z.string()
        .max(200, { message: "Address can have a maximum of 200 characters." })
        .optional()
});

// Registration route with validation
router.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        createUserSchema.parse(req.body);
        await UserController.createUser(req, res, next);
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.message,
            });
        }
        next(err);
    }
});

router.get("/all-users", UserController.getAllUsers);

export const UserRoutes = router;
