import React from 'react'

import { Routes, Route } from 'react-router-dom'
import AuthPage from "./pages/auth";
import RouteGuard from "./components/route-guard";

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
   </Routes>
  )
}

export default App
