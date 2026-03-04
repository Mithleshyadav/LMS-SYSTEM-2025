import express from "express";
const router = express.Router();

import { 
  addNewCourse,
  getAllCourses,
  getCourseDetailsByID,
  updateCourseById
} from  "../../controllers/instructor-controller/course.controller.js";

router.post("/add", addNewCourse);
router.get("/get",getAllCourses);
router.get("/get/details/:id",getCourseDetailsByID);
router.put("/update/:id", updateCourseById);

export default router;
