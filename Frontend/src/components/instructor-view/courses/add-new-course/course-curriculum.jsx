import React, { useContext, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { courseCurriculumInitialFormData } from '@/config';
import { InstructorContext } from '@/context/instructor-context';
import { Upload } from 'lucide-react';
import {
  mediaUploadService
} from '@/services';
import { ItemText } from '@radix-ui/react-select';



const courseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage

  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      }
    ])
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
    
      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData,
          setMediaUploadProgressPercentage);
          if (response.success) {
            let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
            cpyCourseCurriculumFormData[currentIndex] = {
              ...cpyCourseCurriculumFormData[currentIndex],
              videoUrl: response?.data?.url,
              public_id: response?.data?.public_id,
            };
            setCourseCurriculumFormData(cpyCourseCurriculumFormData);
            setMediaUploadProgress(false);
          }

      } catch (error) {
        console.log(error);
      }
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item)=>{
      return (
        item &&
        typeof item.title === 'object' &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  return (
   <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input
          type="file"
          className="hidden"
          />
          <Button
          as="label"
          variant="outline"
          className="cursor-pointer">
            <Upload className="w-4 h-5 mr-2"/>
            Bulk Upload
            </Button>
        </div>

      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        > Add Lecture</Button>

        <div  className='mt-4 space-y-4'>
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div className='border p-4 rounded-md'>
              <div className='flex gap-5 items-center'>
                <h3>Lecture {index+1}</h3>

              </div>

            </div>
          ))}
        </div>

      </CardContent>
   </Card>
  )
}

export default course-curriculum
