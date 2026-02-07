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
import { useInstructorDashboard } from "./useInstructorDashboard";

function InstructorDashboard(listOfCourses) {
 
  const { calculateTotalStudentsAndProfit } = useInstructorDashboard(listOfCourses);
  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: calculateTotalStudentsAndProfit.totalStudents,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: calculateTotalStudentsAndProfit.totalProfit,
    },
  ];

  const { studentList } = calculateTotalStudentsAndProfit();

  const summaryCards = config.map((item, index) => (
    <Card key={index}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
        <item.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{item.value}</div>
      </CardContent>
    </Card>
  ));

  const studentRows = studentList.map((studentItem, index) => {
    return (
      <TableRow key={index}>
        <TableCell className="font-medium">{studentItem.courseTitle}</TableCell>
        <TableCell>{studentItem.studentName}</TableCell>
        <TableCell>{studentItem.studentEmail}</TableCell>
      </TableRow>
    );
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {summaryCards}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
export default InstructorDashboard;
