import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
} from "@/services";

const useAddnewCourse = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

   
 

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === "" || value === null || value === undefined;
  }

  function validateFormData() {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }
      if (item.isfreePreview) {
        hasFreePreview = true;
      }
    }

    return hasFreePreview;
  }

  async function handleCreateCourse() {
    try {
      const courseFinalFormData = {
        instructorId: auth?.user?._id,
        instructorName: auth?.user?.userName,
        date: new Date(),
        ...courseLandingFormData,
        students: [],
        curriculum: courseCurriculumFormData,
        isPublished: true,
      };

      const res = await addNewCourseService(courseFinalFormData);

      toast({
        title: "Success",
        description: res?.data?.message || "Course created successfully",
      });

      // Reset form after success
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);

      navigate(-1); // Go back to previous page
    } catch (err) {
      const error = err?.response?.data;

      if (error?.errors && Array.isArray(error.errors)) {
        error.errors.forEach((validationErr) => {
          toast({
            title: "Validation Error",
            description: validationErr.msg || "Invalid input",
            variant: "destructive",
          });
        });
      } else {
        toast({
          title: "Course Creation Failed",
          description:
            error?.message || "Something went wrong while creating the course",
          variant: "destructive",
        });
      }
    }
  }

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(
      currentEditedCourseId
    );
    

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData,
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }
  }


  

  useEffect(() => {
    if (currentEditedCourseId !== null) {
      fetchCurrentCourseDetails();
    }
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  return {
    handleCreateCourse,
    validateFormData,
  };
};

export default useAddnewCourse;
