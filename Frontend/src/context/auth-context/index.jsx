import React, { createContext, useState } from 'react';
import { useToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";
import { checkAuthService, loginService, registerService, logoutService  } from "@/services";
import { initialSignInFormData,
  initialSignUpFormData
 }  from '@/config';

export const AuthContext = createContext(null);


export default function AuthProvider({ children }) {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

 const { toast } = useToast(); 

  async function handleRegisterUser(event) {
    event.preventDefault();
    const res = await registerService(signUpFormData);

    if (res.success) {
      toast({
        title: res.message || "Registration Successful",
        description: "Welcome aboard!",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: res.message || "Something went wrong",
        variant: "destructive",
      });
    }
  }

 async function handleLoginUser(event) {
    event.preventDefault();
    const res = await loginService(signInFormData);

    if (res.success) {
      setAuth({ authenticate: true, user: res.data.user });
      toast({
        title: 'res.message' || "Login Successful",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  }

   async function checkAuthUser() {
    try {
      const response = await checkAuthService();
      if (response.success) {
        setAuth({
          authenticate: true,
          user: response.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

   useEffect(() => {
    checkAuthUser();
  }, []);

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

 

  async function handleLogoutUser() {
    await logoutService();
    resetCredentials();
    toast({
      title: "Logout Successful",
      description: "You've been logged out.",
    });
  }



 return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        handleLogoutUser
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}