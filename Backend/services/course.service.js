import Course from "../models/course.model.js";

export const createCourse = async (courseData) => {
  const newCourse = new Course(courseData);
  return await newCourse.save();
};

export const getCourseByTitleAndInstructor = async (title, instructorId) => {
  return await Course.findOne({ title, instructorId });
};
