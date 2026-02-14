import { validationResult } from "express-validator";
import {
  uploadMediaToCloudinary,
  createCourse,
  getCourseByTitleAndInstructor,
} from "../../services/course.service.js";
import ApiError from "../../utils/ApiError.js";
import fs from "fs";
import mongoose from "mongoose";

export const addNewCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation failed", errors.array()));
    }

    const courseData = req.body;

    const existingCourse = await getCourseByTitleAndInstructor(
      courseData.title,
      courseData.instructorId,
    );
    if (existingCourse) {
      return next(
        ApiError.badRequest(
          "A course with this title already exists for this instructor",
        ),
      );
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

export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    // Upload to Cloudinary
    const uploadResult = await uploadMediaToCloudinary(req.file.path);

    // Remove temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
    });
  } catch (error) {
    next(new ApiError(500, error.message));
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).lean();

    // Check if empty
    if (!courses || courses.length === 0) {
      return next(new ApiError(404, "No courses found"));
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch courses"));
  }
};

export const getCourseDetailsByID = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ✅ Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid course ID"));
    }

    const course = await Course.findById(id).lean();

    // ✅ If not found
    if (!course) {
      return next(new ApiError(404, "Course not found"));
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: course,
    });
  } catch (error) {
    return next(new ApiError(500, "Failed to fetch course details"));
  }
};

export const updateCourseById = async (req, res, next) => {
  try {
    const id = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, "Invalid course ID"));
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return next(new ApiError(400, "No update data provided"));
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedCourse) {
      return next(new ApiError(404, "Course not found"));
    }
    return res.status(200).json({
      success: true,
      message: "Course updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return next(new ApiError(error));
  }
};
