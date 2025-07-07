import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const generateTokenAndSetCookie = (userId, res) => {
    try {
        // Validate environment variable
        if (!process.env.JWT_SECRET) {
            throw new ApiError(500, "JWT secret is not configured");
        }

        // Generate token with more secure options
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET, // Fixed typo in 'SECRET'
            {
                expiresIn: "10d",
                algorithm: "HS256", // Explicitly specify algorithm
                issuer: "your-app-name", // Good practice for identifying tokens
            }
        );

        // Set cookie with secure options
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Only HTTPS in production
            sameSite: "lax",
            maxAge: 10 * 24 * 60 * 60 * 1000, // Match token expiry (10 days)
            path: "/",
            // signed: true // Only if you're using cookie-parser's signed cookies
        });

        return token; // Return token in case you need it
    } catch (error) {
        throw new ApiError(500, "Token generation failed: " + error.message);
    }
};

export default generateTokenAndSetCookie;