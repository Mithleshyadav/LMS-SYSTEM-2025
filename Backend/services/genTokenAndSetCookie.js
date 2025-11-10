import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const genTokenAndSetCookie = (userId, res) => {
    try {
       
        if (!process.env.JWT_SECRET) {
            throw new ApiError(500, "JWT secret is not configured");
        }

        const token = jwt.sign(
            { _id: userId },
            process.env.JWT_SECRET, 
            {
                expiresIn: "10d",
                algorithm: "HS256", 
                issuer: "your-app-name", 
            }
        );

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "lax",
            maxAge: 10 * 24 * 60 * 60 * 1000, // Match token expiry (10 days)
            path: "/",
            
        });

        return token; 
    } catch (error) {
        throw new ApiError(500, "Token generation failed: " + error.message);
    }
};

export default genTokenAndSetCookie;