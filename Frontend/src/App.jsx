import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";
import { AuthContext } from "./context/auth-context";
import Home from './pages/student/home';
import StudentViewCommonLayout from "./components/student-view/common-layout";

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
       
      
    </Routes>
  );
};

export default App;
