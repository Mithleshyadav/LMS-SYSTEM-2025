import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDb from "./db/db.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"; 
import mediaRoutes from "./routes/instructor-routes/media-routes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectToDb();

app.use(express.json());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/media', mediaRoutes);


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

app.use(errorMiddleware);