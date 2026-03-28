import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Properties from "./pages/Properties";   // 👈 IMPORTANT
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME PAGE (PUBLIC) */}
        <Route path="/" element={<Properties />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;