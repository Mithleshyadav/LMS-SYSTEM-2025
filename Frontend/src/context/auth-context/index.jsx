import React, { createContext, useState } from 'react';
import { initialSignInFormData,
  initialSignUpFormData
 }  from '@/config';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  async function handleRegisterUser(event) {
    event.preventDefault();
    
  }
  async function handleLoginUser(event) {
    event.preventDefault();
    
  }
  return <AuthContext.Provider value={{  
  signUpFormData,         
  setSignUpFormData,
  handleRegisterUser,
  signInFormData,         
  setSignInFormData,
  handleLoginUser,

  }}>
    {children}
    </AuthContext.Provider>
}