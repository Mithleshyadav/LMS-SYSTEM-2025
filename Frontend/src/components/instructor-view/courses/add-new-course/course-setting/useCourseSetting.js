import { useContext, useCallback } from "react";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";

const useCourseSetting = () => {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const handleImageUploadChange = useCallback(
    async (event) => {
      const selectedImage = event.target.files?.[0];
      if (!selectedImage) return;

      // Optional: basic validation (safe guard)
      if (!selectedImage.type.startsWith("image/")) return;

      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        setMediaUploadProgressPercentage(0);

        const response = await mediaUploadService(
          imageFormData,
          (progress) => setMediaUploadProgressPercentage(progress)
        );

        if (response?.success) {
          // ✅ Functional update prevents stale state bug
          setCourseLandingFormData((prev) => ({
            ...prev,
            image: response?.data?.url || "",
          }));
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        // ✅ Always reset
        setMediaUploadProgress(false);
        setMediaUploadProgressPercentage(0);
      }
    },
    [
      setCourseLandingFormData,
      setMediaUploadProgress,
      setMediaUploadProgressPercentage,
    ]
  );

  return {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
    handleImageUploadChange,
  };
};

export default useCourseSetting;



// import { useContext } from "react";
// import { InstructorContext } from "@/context/instructor-context";
// import { mediaUploadService } from "@/services";

// const useCourseSetting = () => {
//   const {
//     courseLandingFormData,
//     setCourseLandingFormData,
//     mediaUploadProgress,
//     setMediaUploadProgress,
//     mediaUploadProgressPercentage,
//     setMediaUploadProgressPercentage,
//   } = useContext(InstructorContext);

//     async function handleImageUploadChange(event) {
//     const selectedImage = event.target.files[0];

//     if (selectedImage) {
//       const imageFormData = new FormData();
//       imageFormData.append("file", selectedImage);

//       try {
//         setMediaUploadProgress(true);
//         const response = await mediaUploadService(
//           imageFormData,
//           setMediaUploadProgressPercentage
//         );
//         if (response.success) {
//           setCourseLandingFormData({
//             ...courseLandingFormData,
//             image: response.data.url,
//           });
//           setMediaUploadProgress(false);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }



//   return {
//     courseLandingFormData,
//     setCourseLandingFormData,
//     mediaUploadProgress,
//     setMediaUploadProgress,
//     mediaUploadProgressPercentage,
//     setMediaUploadProgressPercentage,
//     handleImageUploadChange,
//   };
// };

// export default useCourseSetting;
