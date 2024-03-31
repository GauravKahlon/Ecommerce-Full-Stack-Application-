import { User } from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const adminCheck = async (req, res, next) => {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler("Login first", 401));

    const user = await User.findById(id);

    if (!user) return next(new ErrorHandler("Incorrect Id", 401));

    if (user.role !== "admin") return next(new ErrorHandler("Unauthorised request", 401));

    next();
};
