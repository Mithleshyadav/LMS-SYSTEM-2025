import express from "express";
const router = express.Router();
import multer from"multer";
import path from "path";

import { uploadMedia } from "../../controllers/instructor-controller/course.controller.js";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route: POST /api/v1/media/upload
router.post("/upload", upload.single("file"), uploadMedia);

export default router;
