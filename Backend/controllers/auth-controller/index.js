import userModel from "../../models/User.model.js";
import { createUser } from "../../services/user.service.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../../models/blacklistToken.model.js";
import genTokenAndSetCookie from "../../services/genTokenAndSetCookie.js";
import ApiError from "../../utils/ApiError.js";

export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation failed", errors.array()));
    }

    const { userName, userEmail, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ userEmail });
    if (isUserAlreadyExist) {
      return next(ApiError.badRequest("User already exists"));
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      userName,
      userEmail,
      password: hashedPassword,
    });
    if (!user) {
      return next(ApiError.internal("Failed to create user"));
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully, Please Login to continue",
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation failed", errors.array()));
    }

    const { userEmail, password } = req.body;
    const user = await userModel.findOne({ userEmail }).select("+password");

    if (!user) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(ApiError.badRequest("Invalid email or password"));
    }

    await genTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role,
      }
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await blacklistTokenModel.create({ token: req.token });

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};


export const checkAuth = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(ApiError.notFound("User validation failed"));
    }

    return res.status(200).json({
      success: true,
      message: "User authenticated",
      user: {
        id: user._id,
        userName: user.userName,
        role: user.role,
      }
    });
  } catch (error) {
    next(ApiError.internal(error.message));
  }
};
