import { getAllCourses, getCourseDetailsByID } from "../../../../MERN-LMS-2024/server/controllers/instructor-controller/course-controller";

const express = require("express");
const router = express.Router();

const { 
  addNewCourse,
} = require("../../controllers/instructor-controller/course-controller");

router.post("/add", addNewCourse);
router.post("/get",getAllCourses);
router.post("/get/details/:id",getCourseDetailsByID);
router.put("/update/:id", updateCourseByID);

export default router;
