import React, { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-setting";
import useAddnewCourse from "./useAddnewCourse";

const CourseCurriculum = lazy(() =>
  import("@/components/instructor-view/courses/add-new-course/course-curriculum")
);

const AddNewCoursePage = () => {
  const { isFormValid, handleCreateCourse } = useAddnewCourse();

  return (
    <div className="container ms-auto p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-extrabold">
          Create a new course
        </h1>

        <Button
          disabled={!isFormValid}
          className="text-sm tracking-wider font-bold px-8"
          onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">
                  Curriculum
                </TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="curriculum">
                <Suspense fallback={<TabLoader />}>
                  <CourseCurriculum />
                </Suspense>
              </TabsContent>

              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>

              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TabLoader = () => (
  <div className="flex items-center justify-center py-10 text-sm font-medium">
    Loading curriculum...
  </div>
);

export default AddNewCoursePage;


// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum/index.jsx";
// import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing/index.jsx";
// import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-setting/index.jsx";
// import useAddnewCourse  from "./useAddnewCourse";

// const AddNewCoursePage = () => {
//  const {

//       validateFormData,
//       handleCreateCourse,
//  }  = useAddnewCourse();



//   return (
//     <div className="container ms-auto p-4">
//       <div className="flex justify-between">
//         <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
//         <Button
//           disabled={!validateFormData()}
//           className="text-sm tracking-wider font-bold px-8"
//           onClick={handleCreateCourse}
//         >
//           SUBMIT
//         </Button>
//       </div>

//       <Card>
//         <CardContent>
//           <div className="container mx-auto p-4">
//             <Tabs defaultValue="curriculum" className="space-y-4">
//               <TabsList>
//                 <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
//                 <TabsTrigger value="course-landing-page">
//                   Course Landing Page
//                 </TabsTrigger>
//                 <TabsTrigger value="settings">Settings</TabsTrigger>
//               </TabsList>
              
//               <TabsContent value="curriculum">
//                 <CourseCurriculum />
//               </TabsContent>
//               <TabsContent value="course-landing-page">
//                 <CourseLanding />
//               </TabsContent>
//               <TabsContent value="settings">
//                 <CourseSettings />
//               </TabsContent>
//             </Tabs>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AddNewCoursePage;
