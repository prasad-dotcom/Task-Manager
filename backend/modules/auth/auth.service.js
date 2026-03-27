import User from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};


const signup = async ({ name, email, password }) => {

    const exists = await User.findOne({ email });
    if (exists) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email },
    };

};

const login = async ({ email, password }) => {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token,
        user: { id: user._id, name: user.name, email: user.email },
    };

};

const getMe = async (userId) => {

    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export { signup, login, getMe };

