import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  checkAuthService,
  loginService,
  registerService,
  logoutService,
} from "@/services";
import {
  initialSignInFormData,
  initialSignUpFormData,
} from "@/config";
import { Skeleton } from "@/components/ui/skeleton";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

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

      setSignInFormData(initialSignInFormData);
      navigate("/"); // Redirect to home after login
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
  async function checkAuthUser() {
    try {
      const res = await checkAuthService();
      if (res.success) {
        setAuth({ authenticate: true, user: res.data.user });
      } else {
        resetCredentials();
      }
    } catch (err) {
      resetCredentials();
    } finally {
      setLoading(false);
    }
  }

  // ✅ Logout
  async function handleLogoutUser() {
    try {
      await logoutService();
      resetCredentials();
      toast({
        title: "Logout Successful",
        description: "You've been logged out.",
      });
    } catch (err) {
      toast({
        title: "Logout Failed",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }

  function resetCredentials() {
    setAuth({ authenticate: false, user: null });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUpFormData,
        setSignUpFormData,
        signInFormData,
        setSignInFormData,
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
        auth,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
