import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
  initialSignInFormData,
  initialSignUpFormData,
} from "@/config";
import { logoutService, checkAuthService } from "@/services";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  // ✅ Reset auth safely
  const resetCredentials = useCallback(() => {
    setAuth({ authenticate: false, user: null });
  }, []);

  // ✅ Auth check (memoized)
  const checkAuthUser = useCallback(async () => {
    try {
      const res = await checkAuthService();

      if (res?.data?.success) {
        setAuth({
          authenticate: true,
          user: res.data.user,
        });
        console.log(res?.data?.user)
      }
     
      else {
        resetCredentials();
        console.log("auth reset due to failed check");
      }
       console.log("auth:",auth?.user?.role);
    } catch (err) {
      // 🚀 Do NOT show toast on initial app load
      // Silent fail is better UX
      resetCredentials();
    } finally {
      setLoading(false);
    }
  }, [resetCredentials]);

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  // ✅ Logout
  const handleLogout = useCallback(async () => {
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
        description:
          err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }, [resetCredentials]);

  // ✅ Memoized context value (prevents unnecessary re-renders)
  const value = useMemo(
    () => ({
      signUpFormData,
      setSignUpFormData,
      signInFormData,
      setSignInFormData,
      auth,
      setAuth,
      loading,
      handleLogout,
      resetCredentials,
    }),
    [
      signUpFormData,
      signInFormData,
      auth,
      loading,
      handleLogout,
      resetCredentials,
    ]
  );

  // ✅ Proper App Loading Screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-40 h-10 rounded-md" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}








// import React, { createContext, useState, useEffect } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "@/hooks/use-toast";
// import {
//   initialSignInFormData,
//   initialSignUpFormData,
// } from "@/config";
// import { logoutService,checkAuthService } from "@/services";
// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
//   const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });

//   const [loading, setLoading] = useState(true);

//    async function checkAuthUser() {
//     try {
//       const res = await checkAuthService();
//       console.log("check auth:",res.data.user)
//       if (res.data.success) {
//         setAuth({ authenticate: true, user: res.data.user });
//         console.log("auth set sucessfully")
        
//       } else {
//         resetCredentials();
//       }
//     } catch (err) {
//       const error = err?.response?.data;
//       toast({
//         title: "authentication Failed",
//         description: error?.message || "Invalid credentials",
//         variant: "destructive",
//       });
//       resetCredentials();
//     } finally {
//       setLoading(false);
//     }
//   }

 

//   useEffect(() => {
//     checkAuthUser();
//   }, []);


//   async function handleLogout() {
//     try {
//       await logoutService();
//       resetCredentials();
//       toast({
//         title: "Logout Successful",
//         description: "You've been logged out.",
//       });
//     } catch (err) {
//       toast({
//         title: "Logout Failed",
//         description: err?.response?.data?.message || "Something went wrong",
//         variant: "destructive",
//       });
//     }
//   }

//   function resetCredentials() {
//     setAuth({ authenticate: false, user: null });
//   }
//   return (
//     <AuthContext.Provider
//       value={{
//         signUpFormData,
//         setSignUpFormData,
//         signInFormData,
//         setSignInFormData,
//         auth,
//         setAuth,
//         loading,
//         setLoading,
//         handleLogout,
//         resetCredentials,
//       }}
//     >
//       {loading ? <Skeleton /> : children}
//     </AuthContext.Provider>
//   );
// }
