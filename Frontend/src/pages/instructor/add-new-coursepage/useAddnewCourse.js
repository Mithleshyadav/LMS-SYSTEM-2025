import { useContext, useEffect, useCallback, useMemo } from "react";
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
  updateCourseByIdService,
} from "@/services";

const useAddnewCourse = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { courseId } = useParams();

  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const isEmpty = (value) => {
    if (Array.isArray(value)) return value.length === 0;
    return value === "" || value === null || value === undefined;
  };


  const isFormValid = useMemo(() => {
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) return false;
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

      if (item.freePreview) hasFreePreview = true;
    }

    return hasFreePreview;
  }, [courseLandingFormData, courseCurriculumFormData]);


  const fetchCurrentCourseDetails = useCallback(async () => {
    if (!currentEditedCourseId) return;

    try {
      const response = await fetchInstructorCourseDetailsService(
        currentEditedCourseId
      );

      if (response?.success) {
        const mappedLandingData = Object.keys(
          courseLandingInitialFormData
        ).reduce((acc, key) => {
          acc[key] =
            response?.data?.[key] ?? courseLandingInitialFormData[key];
          return acc;
        }, {});

        setCourseLandingFormData(mappedLandingData);
        setCourseCurriculumFormData(response?.data?.curriculum || []);
      }
    } catch (error) {
      toast({
        title: "Failed to load course",
        description:
          error?.response?.data?.message ||
          "Unable to fetch course details",
        variant: "destructive",
      });
    }
  }, [
    currentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  ]);


  const handleCreateCourse = useCallback(async () => {
    try {
      const courseFinalFormData = {
        instructorId: auth?.user?.id,
        instructorName: auth?.user?.userName,
        date: new Date(),
        ...courseLandingFormData,
        students: [],
        curriculum: courseCurriculumFormData,
        isPublished: true,
      };

      const res =
        currentEditedCourseId !== null
          ? await updateCourseByIdService(
              currentEditedCourseId,
              courseFinalFormData
            )
          : await addNewCourseService(courseFinalFormData);

      toast({
        title: "Success",
        description: res?.data?.message || "Course saved successfully",
      });

      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);

      navigate(-1);
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
          title: "Course Save Failed",
          description:
            error?.message ||
            "Something went wrong while saving the course",
          variant: "destructive",
        });
      }
    }
  }, [
    auth?.user,
    courseLandingFormData,
    courseCurriculumFormData,
    currentEditedCourseId,
    navigate,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  ]);

  useEffect(() => {
    if (courseId) {
      setCurrentEditedCourseId(courseId);
    }
  }, [courseId, setCurrentEditedCourseId]);

  
  useEffect(() => {
    if (currentEditedCourseId !== null) {
      fetchCurrentCourseDetails();
    }
  }, [currentEditedCourseId, fetchCurrentCourseDetails]);

  return {
    handleCreateCourse,
    isFormValid,
  };
};

export default useAddnewCourse;




// import { useContext, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "@/hooks/use-toast";
// import {
//   courseCurriculumInitialFormData,
//   courseLandingInitialFormData,
// } from "@/config";
// import { AuthContext } from "@/context/auth-context";
// import { InstructorContext } from "@/context/instructor-context";
// import {
//   addNewCourseService,
//   fetchInstructorCourseDetailsService,
//   updateCourseByIdService,
// } from "@/services";

// const useAddnewCourse = () => {
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const params = useParams();

//   const {
//     courseLandingFormData,
//     courseCurriculumFormData,
//     setCourseLandingFormData,
//     setCourseCurriculumFormData,
//     currentEditedCourseId,
//     setCurrentEditedCourseId,
//   } = useContext(InstructorContext);

   
 

//   function isEmpty(value) {
//     if (Array.isArray(value)) {
//       return value.length === 0;
//     }
//     return value === "" || value === null || value === undefined;
//   }

//  function validateFormData() {
//   for (const key in courseLandingFormData) {
//     if (isEmpty(courseLandingFormData[key])) {
//       return false;
//     }
//   }

//   let hasFreePreview = false;

//   for (const item of courseCurriculumFormData) {
//     if (
//       isEmpty(item.title) ||
//       isEmpty(item.videoUrl) ||
//       isEmpty(item.public_id)
//     ) {
//       return false;
//     }

//     if (item.freePreview) {  // ✅ FIXED
//       hasFreePreview = true;
//     }
//   }

//   return hasFreePreview;
// }


//   async function handleCreateCourse() {
//     console.log("Creating course with data:", auth?.user);
//     try {
//       const courseFinalFormData = {
//         instructorId: auth?.user?.id,
//         instructorName: auth?.user?.userName,
//         date: new Date(),
//         ...courseLandingFormData,
//         students: [],
//         curriculum: courseCurriculumFormData,
//         isPublished: true,
//       };

//       const res =
//       currentEditedCourseId !== null
//         ? await updateCourseByIdService(
//             currentEditedCourseId,
//             courseFinalFormData
//           )
//         : await addNewCourseService(courseFinalFormData);


//       toast({
//         title: "Success",
//         description: res?.data?.message || "Course created successfully",
//       });

//       // Reset form after success
//       setCourseLandingFormData(courseLandingInitialFormData);
//       setCourseCurriculumFormData(courseCurriculumInitialFormData);

//       navigate(-1); // Go back to previous page
//     } catch (err) {
//       const error = err?.response?.data;

//       if (error?.errors && Array.isArray(error.errors)) {
//         error.errors.forEach((validationErr) => {
//           toast({
//             title: "Validation Error",
//             description: validationErr.msg || "Invalid input",
//             variant: "destructive",
//           });
//         });
//       } else {
//         toast({
//           title: "Course Creation Failed",
//           description:
//             error?.message || "Something went wrong while creating the course",
//           variant: "destructive",
//         });
//       }
//     }
//   }

//   async function fetchCurrentCourseDetails() {
//     const response = await fetchInstructorCourseDetailsService(
//       currentEditedCourseId
//     );
    

//     if (response?.success) {
//       const setCourseFormData = Object.keys(
//         courseLandingInitialFormData,
//       ).reduce((acc, key) => {
//         acc[key] = response?.data[key] || courseLandingInitialFormData[key];

//         return acc;
//       }, {});

//       console.log(setCourseFormData, "setCourseFormData");
//       setCourseLandingFormData(setCourseFormData);
//       setCourseCurriculumFormData(response?.data?.curriculum);
//     }
//   }


  

//   useEffect(() => {
//     if (currentEditedCourseId !== null) {
//       fetchCurrentCourseDetails();
//     }
//   }, [currentEditedCourseId]);

//   useEffect(() => {
//     if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
//   }, [params?.courseId]);

//   return {
//     handleCreateCourse,
//     validateFormData,
//   };
// };

// export default useAddnewCourse;
