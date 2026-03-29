import React, { useState } from "react";
import { createBooking } from "../services/api";
import { useNavigate } from "react-router-dom";

function BookingPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    property: "",
    guest_name: "",
    guest_email: "",
    check_in: "",
    check_out: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔥 CHECK LOGIN
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      alert("You must be logged in to book a property");
      navigate("/register"); // redirect to register page
      return;
    }

    try {
      const result = await createBooking({
        ...formData,
        user_id: userId
      });

      alert("Booking created! Reference: " + result.booking_reference);

      // optional: redirect after booking
      navigate("/");

    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Please try again.");
    }
  }

  return (
    <div>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="property"
          placeholder="Property ID"
          onChange={handleChange}
          required
        />

        <input
          name="guest_name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          name="guest_email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          required
        />

        <input
          name="check_in"
          type="date"
          onChange={handleChange}
          required
        />

        <input
          name="check_out"
          type="date"
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingPage;