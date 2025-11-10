import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './context/auth-context/index.jsx'
import InstructorContextProvider  from "@/context/instructor-context";
import { Toaster } from "@/components/ui/toaster"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <InstructorContextProvider>

  <AuthContextProvider>
  <App/>
  <Toaster/>
  </AuthContextProvider>
  </InstructorContextProvider>
  </BrowserRouter>
);
