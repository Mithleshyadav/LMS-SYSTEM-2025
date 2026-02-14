import React, { createContext, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
  initialSignInFormData,
  initialSignUpFormData,
} from "@/config";
import { logoutService,checkAuthService } from "@/services";
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

   async function checkAuthUser() {
    try {
      const res = await checkAuthService();
      console.log("check auth:",res.data.user)
      if (res.data.success) {
        setAuth({ authenticate: true, user: res.data.user });
        console.log("auth set sucessfully")
        
      } else {
        resetCredentials();
      }
    } catch (err) {
      const error = err?.response?.data;
      toast({
        title: "authentication Failed",
        description: error?.message || "Invalid credentials",
        variant: "destructive",
      });
      resetCredentials();
    } finally {
      setLoading(false);
    }
  }

 

  useEffect(() => {
    checkAuthUser();
  }, []);


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
  return (
    <AuthContext.Provider
      value={{
        signUpFormData,
        setSignUpFormData,
        signInFormData,
        setSignInFormData,
        auth,
        setAuth,
        loading,
        setLoading,
        handleLogoutUser,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
