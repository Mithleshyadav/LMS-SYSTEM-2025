import express from "express";
const router = express.Router();
import multer from"multer";
import path from "path";

import { uploadMedia,uploadBulkMedia, deleteMedia, replaceMedia} from "../../controllers/instructor-controller/course.controller.js";

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 2000 * 1024 *1024}  //2000MB per file
});

// Route: POST /api/v1/media/upload
router.post("/upload", upload.single("file"), uploadMedia);

router.post("/bulk-upload",
  upload.array("files",20),  //max 20 files at one
  uploadBulkMedia
);

router.delete("/delete", deleteMedia);
router.delete("/replace", replaceMedia);
export default router;
