import { useContext } from "react";
import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";

import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/instructor-context";

import { mediaUploadService } from "@/services";

const useCourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      {
        ...courseCurriculumInitialFormData[0],
      },
    ]);
  }

  function handleCourseTitleChange(event, currentIndex) {
    let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
    cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: event.target.value,
    };
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
  }

  async function handleSingleLectureUpload(event, currentIndex) {
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);
      console.log("appended file to form data:", videoFormData.get("file"));

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercentage,
        );
        if (response.success) {
          console.log("Video upload response:", response.data);
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          console.log(
            "Updated Lecture Data:",
            cpyCourseCurriculumFormData[currentIndex],
          );
          console.log("Updated Curriculum Data:", courseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function isCourseCurriculumFormDataValid() {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item.title === "string" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  }

  return {
    mediaUploadProgress,
    mediaUploadProgressPercentage,
    handleNewLecture,
    handleCourseTitleChange,
    handleSingleLectureUpload,
    isCourseCurriculumFormDataValid,
  };
};

export default useCourseCurriculum;
