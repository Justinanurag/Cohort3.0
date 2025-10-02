import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"
import SignUpPage from './Pages/Signup'
import SignInPage from './Pages/Signin'
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
      {/* <Dashboard/>
      <SignInPage/>
      <SignUpPage/> */}
    </div>
  )
}

export default App 