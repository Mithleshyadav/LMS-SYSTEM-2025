import { validationResult } from "express-validator";
import { createCourse, getCourseByTitleAndInstructor } from "../services/course.service.js";
import ApiError from "../utils/ApiError.js";

export const addNewCourse = async (req, res, next) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation failed", errors.array()));
    }

    const courseData = req.body;

    const existingCourse = await getCourseByTitleAndInstructor(courseData.title, courseData.instructorId);
    if (existingCourse) {
      return next(ApiError.badRequest("A course with this title already exists for this instructor"));
    }

    const savedCourse = await createCourse(courseData);
    if (!savedCourse) {
      return next(ApiError.internal("Failed to create course"));
    }

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: savedCourse,
    });
  } catch (error) {

    next(ApiError.internal(error.message));
  }
};
