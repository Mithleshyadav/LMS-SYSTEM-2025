// auth.middleware.js
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";
import ApiError from "../utils/ApiError.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(ApiError.unauthorized("Authentication token not found"));
    }

    // Check if token is blacklisted (user logged out previously)
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
      return next(ApiError.unauthorized("Token has been blacklisted. Please login again."));
    }

    // Verify token and attach user to req
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return next(ApiError.unauthorized("User not found. Invalid token."));
    }

    req.user = user;
    next();
  } catch (error) {
    // Token invalid, expired, or malformed
    return next(ApiError.unauthorized("Invalid or expired token", [error.message]));
  }
};
