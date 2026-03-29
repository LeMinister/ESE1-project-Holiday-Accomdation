import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Properties from "./pages/Properties";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BookProperty from "./pages/BookProperty";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Properties />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        {/* BOOKING */}
        <Route path="/book/:id" element={<BookProperty />} />
      </Routes>
    </Router>
  );
}

export default App;