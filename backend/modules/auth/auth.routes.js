import express from "express";
import { body } from "express-validator";
import { signup, login, getMe} from "./auth.controller.js";
import { protect } from "../../middleware/auth.middleware.js";


const router = express.Router();

router.post(
    "/signup",
    [
        body("name").trim().notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Enter a valid emial"),
        body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters"),
    ],
    signup
);

router.post("/login",
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    login
);

router.get("/me", protect, getMe);

export default router;