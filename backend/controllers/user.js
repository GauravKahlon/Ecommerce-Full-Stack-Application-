import { ErrorHandler } from "../utils/errorHandler.js";
import { User } from "../models/user.js";

export const newUser = async (req, res, next) => {
    try {
        const { _id, name, email, photo, role, gender, dob } = req.body;

        const emailFound = await User.findOne({ email });
        if (emailFound) {
            return next(new ErrorHandler("Email already exists.", 403));
        }

        await User.create({ _id, name, email, photo, role, gender, dob });

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});

        res.json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorHandler("Invalid Id.", 404));
        }

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return next(new ErrorHandler("User doesn't exist."), 404);
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: "User deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};
