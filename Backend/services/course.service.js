import Course from "../models/course.model.js";
import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/ApiError.js";

export const createCourse = async (courseData) => {
  const newCourse = new Course(courseData);
  return await newCourse.save();
};

export const getCourseByTitleAndInstructor = async (title, instructorId) => {
  return await Course.findOne({ title, instructorId });
};


export const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // or "auto" if you may also upload images
      folder: "lms_videos",  // optional: keep uploads organized
    });
    return result;
  } catch (error) {
    throw new ApiError(500, "Cloudinary upload failed");
  }
};
