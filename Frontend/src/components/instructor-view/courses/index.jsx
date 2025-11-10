import { useState, useContext, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//     Table, 
//     TableBody, 
//     TableCell, 
//     TableHead, 
//     TableHeader, 
//     TableRow 
// } from "@/components/ui/table";
import { courseCurriculumInitialFormData, 
    courseLandingInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { useNavigate } from "react-router-dom";

function InstructorCourses() {
    const navigate = useNavigate();
    const {
        setCourseLandingFormData,
        setCourseCurriculumFormData
    } = useContext(InstructorContext)
    return (
        <Card>
            <CardHeader className='flex justify-between flex-row items-center'>
                <CardTitle className='text-3xl font-extrabold'>
                    All Courses
                </CardTitle>
                <Button
                onClick={() => {
                    setCourseLandingFormData(courseLandingInitialFormData)
                    setCourseCurriculumFormData(courseCurriculumInitialFormData);
                    navigate("/instructor/create-new-course")
                }}
                >Create New Course</Button>
            </CardHeader>
        </Card>
    )
}
export default InstructorCourses