import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
  import { toast } from "@/hooks/use-toast";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData
} from "@/config";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import {
  addNewCourseService,
  fetchInstructorCourseDetailsService,
} from "@/services";
import { useContext, useEffect }  from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCoursePage = () => {
  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  function isEmpty(value) {
    if (Array.isArray(value)){
      return value.length === 0;
    }
    return value === "" || value === null || value=== undefined;
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
      ){
        return false;
      }
      if (item.isfreePreview) {
        hasFreePreview = true;
      }
    }

    return hasFreePreview;
  }

//   async function handleCreateCourse() {
//     const courseFinalFormData = {
//       instructorId: auth?.user?._id ,
//       instructorName: auth?.user?.userName,
//       date: new Date(),
//       ...courseLandingFormData,
//       students: [],
//       curriculum: courseCurriculumFormData,
//       isPublished: true,

//     };

//     const response = currentEditedCourseId !== null? await updateCourseByIdService(
//       currentEditedCourseId,
//       courseFinalFormData
//     ) : await addNewCourseService(courseFinalFormData);

//     if (response.success) {
//       setCourseLandingFormData(courseLandingInitialFormData);
//       setCourseCurriculumFormData(courseCurriculumInitialFormData);
//       navigate(-1);
//       setCurrentEditedCourseId(null);
//     }
//  console.log(response.data);
//   }

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
        description: error?.message || "Something went wrong while creating the course",
        variant: "destructive",
      });
    }
  }
}

  async function fetchCurrentCourseDetails() {
    const response = await fetchInstructorCourseDetailsService(currentEditedCourseId);

    if(response?.success){
      const setCourseFormData = Object.keys(courseLandingInitialFormData).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }
  }

  useEffect(() => {
    if(currentEditedCourseId !== null){
      fetchCurrentCourseDetails();
    }
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  },[params?.courseId]);

  return (
    <div className='container ms-auto p-4'>
      <div className='flex justify-between'>
        <h1 className='text-3xl font-extrabold mb-5'>Create a new course</h1>
        <Button
          disabled={!validateFormData()}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
          >
          SUBMIT
        </Button>

      </div>

      <Card>
        <CardContent>
          <div className='container mx-auto p-4'>
            <Tabs defaultValue="curriculum"
            className="space-y-4">
              <TabsList>
                <TabsTrigger
                value="curriculum">
                   Curriculum
                </TabsTrigger>
                <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
                <TabsTrigger
                value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                  <CourseCurriculum/>
              </TabsContent>
              <TabsContent 
              value="course-landing-page">
                <CourseLanding/>
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}

export default AddNewCoursePage;
