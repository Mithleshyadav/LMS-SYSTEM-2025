import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

import {
  initialSignInFormData,
  initialSignUpFormData,
} from "@/config";
import {
  loginService,
  registerService,
} from "@/services";

import { AuthContext } from "@/context/auth-context";


const useAuth = () => {

     const navigate = useNavigate();

 const {
    signUpFormData,
     setSignUpFormData,
     signInFormData,
     setSignInFormData,
     setAuth,
 }  = useContext(AuthContext);

  // ✅ Registration
  async function handleRegisterUser(event) {
    event.preventDefault();
    try {
      const res = await registerService(signUpFormData);
      toast({
        title: "Success",
        description: res?.data?.message || "Registered successfully",
      });

      // Reset form and redirect to sign-in tab
      setSignUpFormData(initialSignUpFormData);
      navigate("/auth?tab=signin"); // handled in AuthPage.jsx
    } catch (err) {
      const error = err?.response?.data;
      toast({
        title: "Registration Failed",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  // ✅ Login
  async function handleLoginUser(event) {
    event.preventDefault();
    try {
      const res = await loginService(signInFormData);
      setAuth({ authenticate: true, user: res?.data?.user });
      toast({
        title: "Success",
        description: res?.data?.message || "Logged in successfully",
      });

      setSignInFormData(initialSignInFormData); // Redirect to home after login
    } catch (err) {
      const error = err?.response?.data;
      toast({
        title: "Login Failed",
        description: error?.message || "Invalid credentials",
        variant: "destructive",
      });
    }
  }

  // ✅ Auth Check
 

  return (signUpFormData,{handleRegisterUser,signInFormData,handleLoginUser,})
}

export default useAuth
