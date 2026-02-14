import { createContext, useState } from 'react'
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData
} from "@/config";

export const InstructorContext = createContext(null);

const InstructorProvider = ({ children }) => {
  const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);
const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(courseCurriculumInitialFormData);
const [currentEditedCourseId, setCurrentEditedCourseId] = useState(null);
const [mediaUploadProgress, setMediaUploadProgress] = useState(false);
const [ mediaUploadProgressPercentage, setMediaUploadProgressPercentage ] = useState(0);
const [instructorCourseList, setInstructorCourseList] = useState(0);

  return (
   <InstructorContext.Provider
   value={{
    courseLandingFormData,
    setCourseLandingFormData,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
    instructorCourseList,
    setInstructorCourseList
   }}>
    {children}
   </InstructorContext.Provider>
  )
}

export default InstructorProvider;
