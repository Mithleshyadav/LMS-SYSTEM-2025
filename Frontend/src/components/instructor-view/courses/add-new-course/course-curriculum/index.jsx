import { useMemo, useRef, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import MediaProgressbar from "@/components/media-progress-bar";
import { Switch } from "@/components/ui/switch";
import useCourseCurriculum from "./useCourseCurriculum";

// ✅ Lazy load VideoPlayer
const VideoPlayer = lazy(() => import("@/components/video-player"));

const CourseCurriculum = () => {
  const bulkUploadInputRef = useRef(null);

  const {
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
  } = useCourseCurriculum();

  function handleOpenBulkUploadDialog() {
    bulkUploadInputRef.current?.click();
  }

  const lectureList = useMemo(
    () =>
      courseCurriculumFormData?.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-900"
        >
          {/* Header */}
          <div className="flex flex-wrap gap-4 items-center mb-5">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
              Lecture {index + 1}
            </h3>

            <Input
              placeholder="Enter Lecture Title"
              value={item.title}
              onChange={(e) => handleCourseTitleChange(e, index)}
              className="flex-1 min-w-[200px]"
            />

            <div className="flex items-center space-x-2">
              <Switch
                onCheckedChange={(value) =>
                  handleFreePreviewChange(value, index)
                }
                checked={item.freePreview}
                id={`freePreview-${index + 1}`}
              />
              <Label htmlFor={`freePreview-${index + 1}`}>
                Free Preview
              </Label>
            </div>
          </div>

          {/* Video Section */}
          <div className="mt-4">
            {item.videoUrl ? (
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 rounded-lg overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="h-[250px] flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
                        Loading Video...
                      </div>
                    }
                  >
                    <VideoPlayer
                      url={item.videoUrl}
                      width="100%"
                      height="250px"
                    />
                  </Suspense>
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-auto">
                  <Button onClick={() => handleReplaceVideo(index)}>
                    Replace Video
                  </Button>

                  <Button
                    onClick={() => handleDeleteLecture(index)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Lecture
                  </Button>
                </div>
              </div>
            ) : (
              <Input
                type="file"
                accept="video/*"
                name={`lecture-video-${index}`}
                onChange={(e) => handleSingleLectureUpload(e, index)}
                className="mb-4"
              />
            )}
          </div>
        </div>
      )),
    [
      courseCurriculumFormData,
      handleCourseTitleChange,
      handleSingleLectureUpload,
      handleFreePreviewChange,
      handleDeleteLecture,
      handleReplaceVideo,
    ]
  );

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <CardTitle className="text-2xl font-bold">
          Create Course Curriculum
        </CardTitle>

        <div>
          <Input
            type="file"
            ref={bulkUploadInputRef}
            accept="video/*"
            multiple
            id="bulk-media-upload"
            className="hidden"
            onChange={handleMediaBulkUpload}
          />

          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer"
            onClick={handleOpenBulkUploadDialog}
          >
            <Upload className="w-5 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          onClick={handleNewLecture}
          className="w-full md:w-auto"
        >
          Add Lecture
        </Button>

        {mediaUploadProgress && (
          <MediaProgressbar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
          />
        )}

        <div className="space-y-6">{lectureList}</div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;


// import { useMemo,useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Upload } from "lucide-react";
// import VideoPlayer from "@/components/video-player";
// import MediaProgressbar from "@/components/media-progress-bar";
// import { Switch } from "@/components/ui/switch";
// import useCourseCurriculum from "./useCourseCurriculum";

// const CourseCurriculum = () => {
  
//   const bulkUploadInputRef = useRef(null);
//   const {
//     mediaUploadProgress,
//     mediaUploadProgressPercentage,
//     courseCurriculumFormData,
//     handleNewLecture,
//     handleCourseTitleChange,
//     handleSingleLectureUpload,
//    // isCourseCurriculumFormDataValid,
//     handleMediaBulkUpload,
//     handleFreePreviewChange,
//     handleDeleteLecture,
//     handleReplaceVideo,
//   } = useCourseCurriculum();

//   function handleOpenBulkUploadDialog(){
//     bulkUploadInputRef.current?.click();
//   }


//   const lectureList = useMemo(
//     () =>
//       courseCurriculumFormData?.map((item, index) => (
//         <div key={index} className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
//           <div className="flex gap-5 items-center mb-4">
//             <h3 className="font-semibold text-lg">Lecture {index + 1}</h3>

//             <Input
//               placeholder="Enter Lecture Title"
//               value={item.title}
//               onChange={(e) => handleCourseTitleChange(e, index)}
//               className="flex-1"
//             />

//             <div className="flex items-center space-x-2">
//               <Switch
//               onCheckedChange={(value) =>
//                 handleFreePreviewChange(value,index)
//               }
//               checked={item.freePreview}
//               id={`freePreview-${index + 1}`}
//               />

//               <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
            
             
//             </div>
//           </div>

//           <div className="mt-6">
//             {item.videoUrl ? (
//               <div className="flex gap-3">
//               <VideoPlayer url={item.videoUrl} width="100%" height="250px" />
//               <Button
//               onClick={()=> handleReplaceVideo(index)}>
//                 Replace Video
//               </Button>
//               <Button
//               onClick={() =>handleDeleteLecture(index)}
//                 className="bg-red-900"
//               >
//                 Delete Lecture
//               </Button>
//               </div>
//             ) : (
//               <Input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleSingleLectureUpload(e, index)}
//                 className="mb-4"
//               />
//             )}
//           </div>
//         </div>
//       )),
//     [courseCurriculumFormData, handleCourseTitleChange, handleSingleLectureUpload]
//   );

//   return (
//     <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
//       <CardHeader className="flex flex-row justify-between items-center">
//         <CardTitle className="text-xl font-bold">Create Course Curriculum</CardTitle>

//         <div>
//           <Input 
//           type="file" 
//           ref={bulkUploadInputRef}
//           accept="video/*"
//           multiple
//           id="bulk-media-upload" 
//           className="hidden" 
//           onChange={handleMediaBulkUpload}
//           />
//           <Button
//             as="label"
//             htmlFor="bulk-media-upload"
//             variant="outline"
//             className="cursor-pointer"
//             onClick={handleOpenBulkUploadDialog}
//           >
//             <Upload className="w-5 h-5 mr-2" />
//             Bulk Upload
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <Button
//           // disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress}
//           onClick={handleNewLecture}
//         >
//           Add Lecture
//         </Button>

//         {mediaUploadProgress && (
//           <MediaProgressbar
//             isMediaUploading={mediaUploadProgress}
//             progress={mediaUploadProgressPercentage}
//           />
//         )}

//         <div className="space-y-4">{lectureList}</div>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseCurriculum;
