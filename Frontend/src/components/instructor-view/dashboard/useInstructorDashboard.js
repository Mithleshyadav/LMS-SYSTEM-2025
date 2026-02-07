const useInstructorDashboard = () => {
  function calculateTotalStudentsAndProfit() {
    const { totalStudents, totalProfit, studentList } = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course?.students?.length || 0;
        const coursePrice = course?.price || 0;
        acc.totalStudents += studentCount;
        acc.totalProfit += coursePrice * studentCount;

        course?.students?.forEach((student) => {
          acc.studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });

        return acc;
      },
      { totalStudents: 0, totalProfit: 0, studentList: [] },
    );

    return { totalStudents, totalProfit, studentList };
  }

  return { calculateTotalStudentsAndProfit };
};

export default useInstructorDashboard;
