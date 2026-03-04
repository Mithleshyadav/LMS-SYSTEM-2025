import { useMemo, useContext,memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";

import { InstructorContext } from "@/context/instructor-context";
import { Delete, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();

  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  // ✅ Memoized Course Rows
  const renderedCourses = useMemo(() => {
    if (!listOfCourses || listOfCourses.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-10 text-gray-500">
            No courses available
          </TableCell>
        </TableRow>
      );
    }

    return listOfCourses.map((course) => {
      const studentCount = course.students?.length || 0;
      const revenue = studentCount * course.pricing;

      return (
        <TableRow
          key={course._id}
          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <TableCell className="font-semibold text-gray-800 dark:text-white">
            {course.title}
          </TableCell>

          <TableCell>{studentCount}</TableCell>

          <TableCell className="font-medium text-green-600">
            ${revenue}
          </TableCell>

          <TableCell className="text-right space-x-2">
            <Button
              onClick={() =>
                navigate(`/instructor/edit-course/${course._id}`)
              }
              variant="ghost"
              size="sm"
              className="hover:bg-blue-100 dark:hover:bg-blue-900"
            >
              <Edit className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-red-100 dark:hover:bg-red-900"
            >
              <Delete className="h-5 w-5 text-red-600" />
            </Button>
          </TableCell>
        </TableRow>
      );
    });
  }, [listOfCourses, navigate]);

  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          All Courses
        </CardTitle>

        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="px-6 py-5 text-base font-semibold"
        >
          Create New Course
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>{renderedCourses}</TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(InstructorCourses);



// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   courseCurriculumInitialFormData,
//   courseLandingInitialFormData,
// } from "@/config";

// import { InstructorContext } from "@/context/instructor-context";
// import { Delete, Edit } from "lucide-react";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// function InstructorCourses({ listOfCourses }) {
//   const navigate = useNavigate();
//   const {
//     setCurrentEditedCourseId,
//     setCourseLandingFormData,
//     setCourseCurriculumFormData,
//   } = useContext(InstructorContext);

//  function renderListOfCourses() {
//   if (!listOfCourses || listOfCourses.length === 0) {
//     return (
//       <TableRow>
//         <TableCell colSpan={4} className="text-center py-6">
//           No courses available
//         </TableCell>
//       </TableRow>
//     );
//   }

//   return listOfCourses.map((course) => (
//     <TableRow key={course._id}>
//       <TableCell className="font-medium">{course.title}</TableCell>

//       <TableCell>{course.students?.length}</TableCell>

//       <TableCell>
//         ${course.students?.length * course.pricing}
//       </TableCell>

//       <TableCell className="text-right space-x-2">
//         <Button
//           onClick={() =>
//             navigate(`/instructor/edit-course/${course._id}`)
//           }
//           variant="ghost"
//           size="sm"
//         >
//           <Edit className="h-5 w-5" />
//         </Button>

//         <Button variant="ghost" size="sm">
//           <Delete className="h-5 w-5" />
//         </Button>
//       </TableCell>
//     </TableRow>
//   ));
// }



 
//   return (
//     <Card>
//       <CardHeader className="flex justify-between flex-row items-center">
//         <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
//         <Button
//           onClick={() => {
//             setCurrentEditedCourseId(null);
//             setCourseLandingFormData(courseLandingInitialFormData);
//             setCourseCurriculumFormData(courseCurriculumInitialFormData);
//             navigate("/instructor/create-new-course");
//           }}
//           className="p-6"
//         >
//           Create New Course
//         </Button>
//       </CardHeader>
//       <CardContent>
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Course</TableHead>
//                 <TableHead>Students</TableHead>
//                 <TableHead>Revenue</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>{renderListOfCourses()}</TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default InstructorCourses;

