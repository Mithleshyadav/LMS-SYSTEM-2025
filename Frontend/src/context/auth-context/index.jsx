import React, { createContext, useState } from 'react';
import { initialSignInFormData }  from '@/config';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);

  async function handleLoginUser(event) {
    event.preventDefault();
    
  }
  return <AuthContext.Provider value={{ signInFormData, setSignInFormData,
   handleLoginUser,

  }}>
    {children}
    </AuthContext.Provider>
}