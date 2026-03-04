import { validationResult } from "express-validator";
import {
  uploadMediaToCloudinary,
  createCourse,
  getCourseByTitleAndInstructor,
  deleteMediaFromCloudinary,
  replaceMediaFromCloudinary,
} from "../../services/course.service.js";
import ApiError from "../../utils/ApiError.js";
import fs from "fs";
import mongoose from "mongoose";
import Course from "../../models/course.model.js"
import cloudinary from "../../config/cloudinary.js";

export const addNewCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest("Validation failed", errors.array()));
    }

    const courseData = req.body;
    console.log("Received course data:", courseData);

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


export const uploadBulkMedia = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new ApiError(400, "No files uploaded");
    }

    // Upload all files in parallel (faster 🚀)
  const uploadPromises = req.files.map((file) =>
      uploadMediaToCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    // ✅ Only send required fields
    const uploadedFiles = results.map((item) => ({
      url: item.secure_url,
      public_id: item.public_id,
    })
  );
    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      data: uploadedFiles,
    });
  } catch (error) {
    console.error("Bulk Upload Error:", error);
    next(error);
  }
};

export const deleteMedia = async(req,res,next) => {
  try{
    const { public_id, courseId } = req.query;

     if (!courseId || !public_id) {
      return res.status(400).json({
        success: false,
        message: "courseId and public_id are required",
      });
    }

    const result = await deleteMediaFromCloudinary(public_id);
    await Course.findByIdAndUpdate(courseId, { $pull: { curriculum: { public_id: public_id } } });
    return res.status(200).json({
      success: true,
      message: "Media deleted successfully",
      data: result,
    });

  } catch (error){
    next(error);
  }
}

export const replaceMedia = async(req,res,next)=>{
  try{
    const { public_id } = req.body;
    if (!public_id){
      return res.status(400).json({
        success: false,
        message: "public_id is required",
      })
    }
    const result = await replaceMediaFromCloudinary(public_id);
    res.status(200).json({
      success: true,
      message: "Media replaced successfully",
    })
  }catch(error){
    next(error);
  }
}

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
    const { id } = req.params;
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
