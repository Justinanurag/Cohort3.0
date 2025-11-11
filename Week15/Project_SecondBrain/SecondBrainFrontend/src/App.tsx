import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SignUpPage from "./Pages/Signup";
import SignInPage from "./Pages/Signin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Dashboard with Sidebar */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Optional: default route */}
        <Route path="*" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
