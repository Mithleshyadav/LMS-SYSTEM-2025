import { useContext, useCallback } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { courseCurriculumInitialFormData } from "@/config";
import {
  mediaUploadService,
  mediaDeleteService,
  mediaBulkUploadService,
  mediaReplaceService,
} from "@/services";

const useCourseCurriculum = () => {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
    currentEditedCourseId,
  } = useContext(InstructorContext);

  // ✅ Add new lecture
  const handleNewLecture = useCallback(() => {
    setCourseCurriculumFormData((prev) => [
      ...prev,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  }, [setCourseCurriculumFormData]);

  // ✅ Update lecture title
  const handleCourseTitleChange = useCallback(
    (event, currentIndex) => {
      const value = event.target.value;

      setCourseCurriculumFormData((prev) =>
        prev.map((item, index) =>
          index === currentIndex ? { ...item, title: value } : item,
        ),
      );
    },
    [setCourseCurriculumFormData],
  );

  // ✅ Toggle free preview
  const handleFreePreviewChange = useCallback(
    (checked, index) => {
      setCourseCurriculumFormData((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, freePreview: checked } : item,
        ),
      );
    },
    [setCourseCurriculumFormData],
  );

  function AreAllCourseCurriculumFormDataObjectsEmpty(arr) {
    if (!Array.isArray(arr)) return true;

    return arr.every((obj) =>
      Object.entries(obj).every(([_, value]) => {
        if (typeof value === "boolean") return true;
        return value === "";
      }),
    );
  }

  // ✅ Single Lecture Upload
  const handleSingleLectureUpload = useCallback(
    async (event, currentIndex) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        setMediaUploadProgressPercentage(0);

        const response = await mediaUploadService(videoFormData, (progress) =>
          setMediaUploadProgressPercentage(progress),
        );

        if (response?.success) {
          setCourseCurriculumFormData((prev) =>
            prev.map((item, index) =>
              index === currentIndex
                ? {
                    ...item,
                    videoUrl: response?.data?.url || "",
                    public_id: response?.data?.public_id || "",
                  }
                : item,
            ),
          );
        }
      } catch (error) {
        console.error("Lecture upload failed:", error);
      } finally {
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(0);
      }
    },
    [
      setCourseCurriculumFormData,
      setMediaUploadProgress,
      setMediaUploadProgressPercentage,
    ],
  );

  // ✅ Bulk Upload
  const handleMediaBulkUpload = useCallback(
    async (event) => {
      const selectedFiles = Array.from(event.target.files || []);
      if (selectedFiles.length === 0) return;

      const bulkFormData = new FormData();
      selectedFiles.forEach((file) => {
        bulkFormData.append("files", file);
      });

      try {
        setMediaUploadProgress(true);

        const response = await mediaBulkUploadService(bulkFormData, (progress) =>
          setMediaUploadProgressPercentage(progress),
        );

        if (response?.success && Array.isArray(response.data)) {
          setCourseCurriculumFormData((prev) => {
            const existing = AreAllCourseCurriculumFormDataObjectsEmpty(prev)
              ? []
              : [...prev];

            const newLectures = response.data.map((item, index) => ({
              videoUrl: item?.url || "",
              public_id: item?.public_id || "",
              title: `Lecture ${existing.length + index + 1}`,
              freePreview: false,
            }));

            return [...existing, ...newLectures];
          });
        }
      } catch (error) {
        console.error("Bulk upload failed:", error);
      } finally {
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(0);
      }
    },
    [
      setCourseCurriculumFormData,
      setMediaUploadProgress,
      setMediaUploadProgressPercentage,
    ],
  );

  // ✅ Delete Lecture
  const handleDeleteLecture = useCallback(
    async (currentIndex) => {
      const lecture = courseCurriculumFormData[currentIndex];
      if (!lecture) return;

      const publicId = lecture.public_id;

      if (currentEditedCourseId && publicId) {
        try {
          const response = await mediaDeleteService(
            currentEditedCourseId,
            publicId,
          );
          if (!response?.success) return;
        } catch (error) {
          console.error("Delete failed:", error);
          return;
        }
      }

      setCourseCurriculumFormData((prev) =>
        prev.filter((_, index) => index !== currentIndex),
      );
    },
    [
      courseCurriculumFormData,
      currentEditedCourseId,
      setCourseCurriculumFormData,
    ],
  );

  // ✅ Replace Video
  const handleReplaceVideo = useCallback(
    async (currentIndex) => {
      const lecture = courseCurriculumFormData[currentIndex];
      if (!lecture?.public_id) return;

      try {
        const response = await mediaReplaceService(lecture.public_id);

        if (response?.success) {
          setCourseCurriculumFormData((prev) =>
            prev.map((item, index) =>
              index === currentIndex
                ? { ...item, videoUrl: "", public_id: "" }
                : item,
            ),
          );
        }
      } catch (error) {
        console.error("Replace failed:", error);
      }
    },
    [courseCurriculumFormData, setCourseCurriculumFormData],
  );

  return {
    mediaUploadProgress,
    mediaUploadProgressPercentage,
    courseCurriculumFormData,
    handleNewLecture,
    handleCourseTitleChange,
    handleSingleLectureUpload,
    handleMediaBulkUpload,
    handleFreePreviewChange,
    handleDeleteLecture,
    handleReplaceVideo,
  };
};

export default useCourseCurriculum;



// import { useContext, useCallback } from "react";
// import { InstructorContext } from "@/context/instructor-context";
// import { courseCurriculumInitialFormData } from "@/config";
// import {
//   mediaUploadService,
//   mediaDeleteService,
//   mediaBulkUploadService,
//   mediaReplaceService,
// } from "@/services";

// const useCourseCurriculum = () => {
//   const {
//     courseCurriculumFormData,
//     setCourseCurriculumFormData,
//     mediaUploadProgress,
//     setMediaUploadProgress,
//     mediaUploadProgressPercentage,
//     setMediaUploadProgressPercentage,
//     currentEditedCourseId,
//   } = useContext(InstructorContext);

//   // ✅ Add new lecture safely
//   const handleNewLecture = useCallback(() => {
//     setCourseCurriculumFormData((prev) => [
//       ...prev,
//       { ...courseCurriculumInitialFormData[0] },
//     ]);
//   }, [setCourseCurriculumFormData]);

//   // ✅ Update lecture title safely
//   const handleCourseTitleChange = useCallback(
//     (event, currentIndex) => {
//       const value = event.target.value;
//       setCourseCurriculumFormData((prev) => {
//         const updated = [...prev];
//         updated[currentIndex] = { ...updated[currentIndex], title: value };
//         return updated;
//       });
//     },
//     [setCourseCurriculumFormData],
//   );

//   const handleFreePreviewChange = useCallback(
//     (checked, index) => {
//       setCourseCurriculumFormData((prev) => {
//         const updated = [...prev];
//         updated[index].freePreview = checked;
//         return updated;
//       });
//     },
//     [setCourseCurriculumFormData],
//   );

//   function AreAllCourseCurriculumFormDataObjectsEmpty(arr) {
//     return arr.every((obj) => {
//       return Object.entries(obj).every(([key, value]) => {
//         if (typeof value === "boolean") return true;
//         return value === "";
//       });
//     });
//   }

//   // ✅ Upload a single lecture video
//   const handleSingleLectureUpload = useCallback(
//     async (event, currentIndex) => {
//       const selectedFile = event.target.files?.[0];
//       if (!selectedFile) return;

//       const videoFormData = new FormData();
//       videoFormData.append("file", selectedFile);

//       try {
//         setMediaUploadProgress(true);
//         setMediaUploadProgressPercentage(0);

//         const response = await mediaUploadService(videoFormData, (progress) =>
//           setMediaUploadProgressPercentage(progress),
//         );

//         if (response?.success) {
//           setCourseCurriculumFormData((prev) => {
//             const updated = [...prev];
//             updated[currentIndex] = {
//               ...updated[currentIndex],
//               videoUrl: response?.data?.url || "",
//               public_id: response?.data?.public_id || "",
//             };
//             return updated;
//           });
//         }
//       } catch (error) {
//         console.error("Lecture upload failed:", error);
//       } finally {
//         setMediaUploadProgress(false);
//         setMediaUploadProgressPercentage(0);
//       }
//     },
//     [
//       setCourseCurriculumFormData,
//       setMediaUploadProgress,
//       setMediaUploadProgressPercentage,
//     ],
//   );

//   async function handleMediaBulkUpload(event) {
//     const selectedFiles = Array.from(event.target.files);
//     const bulkFormData = new FormData();

//     selectedFiles.forEach((file) => {
//       bulkFormData.append("files", file);
//     });

//     try {
//       setMediaUploadProgress(true);

//       const response = await mediaBulkUploadService(bulkFormData, (progress) =>
//         setMediaUploadProgressPercentage(progress),
//       );

//       if (response?.success) {
//         setCourseCurriculumFormData((prev) => {
//           const existing = AreAllCourseCurriculumFormDataObjectsEmpty(prev)
//             ? []
//             : [...prev];

//           const newLectures = response.data.map((item, index) => ({
//             videoUrl: item.url,
//             public_id: item.public_id,
//             title: `Lecture ${existing.length + index + 1}`,
//             freePreview: false,
//           }));

//           return [...existing, ...newLectures];
//         });
//       }
//     } catch (error) {
//       console.error("Bulk upload failed:", error);
//     } finally {
//       setMediaUploadProgress(false);
//     }
//   }

//   async function handleDeleteLecture(currentIndex) {
//     let cpyCourseCurriculumFormData = [...courseCurriculumFormData];

//     const publicId = cpyCourseCurriculumFormData[currentIndex].public_id;

//     // If editing existing course → delete from backend
//     if (currentEditedCourseId) {
//       const response = await mediaDeleteService(
//         currentEditedCourseId,
//         publicId,
//       );

//       if (!response?.success) return;
//     }

//     // Always update frontend state
//     cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
//       (_, index) => index !== currentIndex,
//     );

//     setCourseCurriculumFormData(cpyCourseCurriculumFormData);
//   }


//   async function handleReplaceVideo(currentIndex) {
//     let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
//     const getCurrentSelectedVideoPublicId =
//       cpyCourseCurriculumFormData[currentIndex].public_id;

//     const deleteCurrentMediaResponse = await mediaReplaceService(
//       getCurrentSelectedVideoPublicId,
//     );

//     if (deleteCurrentMediaResponse?.success) {
//       cpyCourseCurriculumFormData[currentIndex] = {
//         ...cpyCourseCurriculumFormData[currentIndex],
//         videoUrl: "",
//         public_id: "",
//       };
//       setCourseCurriculumFormData(cpyCourseCurriculumFormData);
//     }
//   }

//   return {
//     mediaUploadProgress,
//     mediaUploadProgressPercentage,
//     courseCurriculumFormData,
//     handleNewLecture,
//     handleCourseTitleChange,
//     handleSingleLectureUpload,
//     handleMediaBulkUpload,
//     handleFreePreviewChange,
//     handleDeleteLecture,
//     handleReplaceVideo,
//   };
// };

// export default useCourseCurriculum;
