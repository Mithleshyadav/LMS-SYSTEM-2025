import React from 'react'
import { Button } from './components/ui/button.jsx'
import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth/index.jsx'

const App = () => {
  return (
   <Routes>
    <Route path="/auth" element={<AuthPage/>}/>
   </Routes>
  )
}

export default App
