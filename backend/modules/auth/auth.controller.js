import * as authService from "./auth.service.js";
import pkg from "express-validator";
const { validationResult } = pkg;

const signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });

        }

        const data = await authService.signup(req.body);
        res.status(201).json({ success: true, message: "Account created", data });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, message: errors.array()[0].msg });

        }
        const data = await authService.login(req.body);
        res.status(200).json({ success: true, message: "Login successful", data });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await authService.getMe(req.user._id);
        res.status(200).json({ success: true, data: { user } });
    } catch (error) {
        next(error);
    }
};

export { signup, login, getMe };