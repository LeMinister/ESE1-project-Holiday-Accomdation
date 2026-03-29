import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookProperty from "./pages/BookProperty";
import ManageBookings from "./pages/ManageBookings";

export default function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR ALWAYS VISIBLE */}
      <Header />

      <Routes>
        {/* HOME / PROPERTY LIST */}
        <Route path="/" element={<Home />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* BOOKING FLOW */}
        <Route path="/book/:id" element={<BookProperty />} />

        {/* USER BOOKINGS */}
        <Route path="/bookings" element={<ManageBookings />} />
      </Routes>
    </BrowserRouter>
  );
}