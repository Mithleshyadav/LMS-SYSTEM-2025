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
      resource_type: "auto"
    });

    return result;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};


export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result =await cloudinary.uploader.destroy(publicId, {
      resource_type:"video"
    });
    if(result.result !== "ok"){
      throw new ApiError(400, "Failed to delete media from Cloudinary");
    }
    console.log("cloudinary delete result:", result);
    return result;

  } catch (error){
    throw new ApiError(500, error.message);
  }
}

export const replaceMediaFromCloudinary = async (publicId) => {
  try {
   const  result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "video"
   });
   if(result.result !== "ok"){
    throw new ApiError(400, "Failed to replace media in Cloudinary");
   }

  } catch (error){
    throw new ApiError(500, error.message);
  }
}