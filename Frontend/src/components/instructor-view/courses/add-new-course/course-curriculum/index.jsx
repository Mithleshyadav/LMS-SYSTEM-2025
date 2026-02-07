import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import VideoPlayer from "@/components/video-player";
import { useCourseCurriculum } from "./useCourseCurriculum";

const CourseCurriculum = () => {
  const {
    mediaUploadProgress,
    mediaUploadProgressPercentage,
    courseCurriculumFormData,
    handleNewLecture,
    handleCourseTitleChange,
    handleSingleLectureUpload,
    isCourseCurriculumFormDataValid,
  } = useCourseCurriculum();

  function getmediaUploadProgress() {
    return mediaUploadProgress ? (
      <MediaProgressbar
        isMediaUploading={mediaUploadProgress}
        progress={mediaUploadProgressPercentage}
      />
    ) : null;
  }

  const lectureList = courseCurriculumFormData.map((item, index) => (
    <div key={index} className="border p-4 rounded-md">
      <div className="flex gap-5 items-center">
        <h3 className="font-semibold">Lecture {index + 1}</h3>

        <Input
          placeholder="Enter Lecture Title"
          value={item.title}
          onChange={(e) => handleCourseTitleChange(e, index)}
        />

        <div className="flex items-center space-x-2">
          <Label>Free Preview</Label>
        </div>
      </div>

      <div className="mt-6">
        {item.videoUrl ? (
          <VideoPlayer url={item.videoUrl} width="450px" height="200px" />
        ) : (
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => handleSingleLectureUpload(e, index)}
          />
        )}
      </div>
    </div>
  ));

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Create Course Curriculum</CardTitle>
        <div>
          <Input type="file" className="hidden" />
          <Button
            as="label"
            htmlFor="bulk-media-upload"
            variant="outline"
            className="cursor-pointer"
          >
            <Upload className="w-4 h-5 mr-2" />
            Bulk Upload
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          {" "}
          Add Lecture
        </Button>

        {getmediaUploadProgress()}

        <div className="mt-4 space-y-4">{lectureList}</div>
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;
