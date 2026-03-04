import { useMemo } from "react";
import MediaProgressbar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCourseSetting from "./useCourseSetting";

function CourseSettings() {
  const {
    courseLandingFormData,
    mediaUploadProgress,
    mediaUploadProgressPercentage,
    handleImageUploadChange,
  } = useCourseSetting();

  // ✅ Memoized Progress Bar
  const renderProgressBar = useMemo(() => {
    if (!mediaUploadProgress) return null;

    return (
      <MediaProgressbar
        isMediaUploading={mediaUploadProgress}
        progress={mediaUploadProgressPercentage}
      />
    );
  }, [mediaUploadProgress, mediaUploadProgressPercentage]);

  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Course Settings
        </CardTitle>
      </CardHeader>

      {/* Upload Progress */}
      {mediaUploadProgress && (
        <div className="px-6 pb-2">
          {renderProgressBar}
        </div>
      )}

      <CardContent className="space-y-6">
        {courseLandingFormData?.image ? (
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md">
            <img
              src={courseLandingFormData.image}
              alt="Course Thumbnail"
              loading="lazy"
              className="w-full max-h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 bg-gray-50 dark:bg-gray-900">
            <Label className="text-sm font-medium">
              Upload Course Image
            </Label>

            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
              name="course-image"
              className="cursor-pointer"
            />

            <p className="text-xs text-gray-500">
              Recommended size: 1280x720 (16:9 ratio)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CourseSettings;



// import MediaProgressbar from "@/components/media-progress-bar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import  useCourseSetting  from "./useCourseSetting";

// function CourseSettings() {
  
// const {
//     courseLandingFormData,
//     mediaUploadProgress,
//     mediaUploadProgressPercentage,
//     handleImageUploadChange,
//     } = useCourseSetting();
  
//     function getMediaUploadProgressBar(){
//         if(!mediaUploadProgress){
//           return null;
//         }
//          return <MediaProgressbar
//             isMediaUploading={mediaUploadProgress}
//             progress={mediaUploadProgressPercentage}
//           />
       
//     }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Course Settings</CardTitle>
//       </CardHeader>
//       <div className="p-4">
//        {getMediaUploadProgressBar()}
//       </div>
//       <CardContent>
//         {courseLandingFormData?.image ? (
//           <img src={courseLandingFormData.image} />
//         ) : (
//           <div className="flex flex-col gap-3">
//             <Label>Upload Course Image</Label>
//             <Input
//               onChange={handleImageUploadChange}
//               type="file"
//               accept="image/*"
//             />
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// export default CourseSettings;
