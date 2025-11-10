import React, { useContext, useRef } from 'react'
import  MediaProgressbar from '@/components/media-progress-bar';
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
import VideoPlayer from '@/components/video-player';
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
    console.log("Selected File:", selectedFile);

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      console.log("appended file to form data:", videoFormData.get("file"))
    
      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(videoFormData,
          setMediaUploadProgressPercentage);
          if (response.success) {
            console.log("Video upload response:", response.data);
            let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
            cpyCourseCurriculumFormData[currentIndex] = {
              ...cpyCourseCurriculumFormData[currentIndex],
              videoUrl: response?.data?.url,
              public_id: response?.data?.public_id,
            };
            setCourseCurriculumFormData(cpyCourseCurriculumFormData);
            console.log("Updated Lecture Data:", cpyCourseCurriculumFormData[currentIndex]);
            console.log("Updated Curriculum Data:",  courseCurriculumFormData);
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
        typeof item.title === 'string' &&
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
          htmlFor='bulk-media-upload'
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
        
         {mediaUploadProgress ? (
          < MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        ) : null}

        <div  className='mt-4 space-y-4'>
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className='border p-4 rounded-md'>
              <div className='flex gap-5 items-center'>
                <h3 className='font-semibold'>Lecture {index+1}</h3>
                <Input
                name={`title-${index+1}`}
                placeholder='Enter Lecture Title'
                onChange={(event)=>handleCourseTitleChange(event, index)}
                value= {courseCurriculumFormData[index]?.title}
                />
                <div className='flex items-center space-x-2'>
                  <Label htmlFor={`freePreview-${index + 1}`}>
                    Free Preview</Label>

                </div>
              </div>
              <div className='mt-6'>
                {courseCurriculumFormData[index]?.videoUrl ? (
                  <div className='flex gap-3'>
                    <VideoPlayer
                    url={courseCurriculumFormData[index]?.videoUrl}
                    width='450px'
                    height='200px'
                    />
                   
                  </div>
                ):(
                  <Input
                  type='file'
                  accept='video/*'
                  onChange={(event) => handleSingleLectureUpload(event, index)}
                  className='mb-4'
                  />
                )}

              </div>

            </div>
          ))}
        </div>

      </CardContent>
   </Card>
  )
}

export default courseCurriculum
