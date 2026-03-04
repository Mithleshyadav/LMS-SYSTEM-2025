import { useMemo,memo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";
import useInstructorDashboard from "./useInstructorDashboard";

function InstructorDashboard({ listOfCourses = [] }) {
  const { calculateTotalStudentsAndProfit } = useInstructorDashboard();

  // ✅ Calculate once (important optimization)
  const dashboardData = useMemo(() => {
    return calculateTotalStudentsAndProfit(listOfCourses);
  }, [listOfCourses, calculateTotalStudentsAndProfit]);

  const config = useMemo(
    () => [
      {
        icon: Users,
        label: "Total Students",
        value: dashboardData.totalStudents,
      },
      {
        icon: DollarSign,
        label: "Total Revenue",
        value: `$${dashboardData.totalProfit.toLocaleString()}`,
      },
    ],
    [dashboardData]
  );

  const summaryCards = config.map((item, index) => (
    <Card
      key={index}
      className="shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {item.label}
        </CardTitle>
        <item.icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{item.value}</div>
      </CardContent>
    </Card>
  ));

  const studentRows =
    dashboardData.studentList.length === 0 ? (
      <TableRow>
        <TableCell colSpan={3} className="text-center py-8 text-gray-500">
          No students enrolled yet
        </TableCell>
      </TableRow>
    ) : (
      dashboardData.studentList.map((studentItem, index) => (
        <TableRow
          key={index}
          className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <TableCell className="font-medium">
            {studentItem.courseTitle}
          </TableCell>
          <TableCell>{studentItem.studentName}</TableCell>
          <TableCell>{studentItem.studentEmail}</TableCell>
        </TableRow>
      ))
    );

  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {summaryCards}
      </div>

      {/* Students Table */}
      <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Students List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{studentRows}</TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(InstructorDashboard);



// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";
// import { DollarSign, Users } from "lucide-react";
// import  useInstructorDashboard  from "./useInstructorDashboard";

// function InstructorDashboard({listOfCourses= []}) {

//   const { calculateTotalStudentsAndProfit } = useInstructorDashboard();
//   const config = [
//     {
//       icon: Users,
//       label: "Total Students",
//       value: calculateTotalStudentsAndProfit(listOfCourses).totalStudents,
//     },
//     {
//       icon: DollarSign,
//       label: "Total Revenue",
//       value: calculateTotalStudentsAndProfit(listOfCourses).totalProfit,
//     },
//   ];

//   const { studentList } = calculateTotalStudentsAndProfit(listOfCourses);

//   const summaryCards = config.map((item, index) => (
//     <Card key={index}>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
//         <item.icon className="h-4 w-4 text-muted-foreground" />
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{item.value}</div>
//       </CardContent>
//     </Card>
//   ));

//   const studentRows = studentList.map((studentItem, index) => {
//     return (
//       <TableRow key={index}>
//         <TableCell className="font-medium">{studentItem.courseTitle}</TableCell>
//         <TableCell>{studentItem.studentName}</TableCell>
//         <TableCell>{studentItem.studentEmail}</TableCell>
//       </TableRow>
//     );
//   });

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {summaryCards}
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Students List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <Table className="w-full">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Course Name</TableHead>
//                   <TableHead>Student Name</TableHead>
//                   <TableHead>Student Email</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>{studentRows}</TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// export default InstructorDashboard;
