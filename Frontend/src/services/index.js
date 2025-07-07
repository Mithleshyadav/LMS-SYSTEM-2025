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


