import { useContext, useMemo } from "react";
import FormControls from "@/components/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/instructor-context";

const CourseLanding = () => {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);



  return (
    <Card className="shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Course Landing Page
        </CardTitle>
        <p className="text-sm text-gray-500">
          Configure how your course appears to students.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseLanding;