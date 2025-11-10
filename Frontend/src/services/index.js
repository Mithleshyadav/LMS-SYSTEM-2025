import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
  const data = await axiosInstance.post("/api/v1/auth/register", {
    ...formData,
    role: "user",
  });
   return data;
}

export async function loginService(formData) {
  const data =  await axiosInstance.post("/api/v1/auth/login", formData);
   return data;
}

export async function checkAuthService() {
  const data = await axiosInstance.get("/api/v1/auth/checkAuth");

  return data;
}


export const logoutService = async () => {
  const  data  = await axiosInstance.post("/api/v1/auth/logout");
  return data;
};


export async function addNewCourseService(formData){
  const { data } = await axiosInstance.post(`/api/v1/instructor/course/add`, formData);
  return data;
}

export async function updateCourseByIdService(id,
  formData
 ) {
  const { data } = await axiosInstance.put(`/api/v1/instructor/course/update/${id}`, formData); 
  return data;
 }

 export async function fetchInstructorCourseDetailsService(id) {
  const { data } = await axiosInstance.get(`/api/v1/instructor/course/get/details/${id}`, formData);
  
  return data;
 }
 
 export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/api/v1/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // ✅ override only here
    },
    onUploadProgress: (ProgressEvent) => {
      const percentCompleted = Math.round(
        (ProgressEvent.loaded * 100) / ProgressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });
  return data;
}
