import React, { useState } from "react";
import { createBooking } from "../services/api";

function BookingPage() {

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

    const result = await createBooking(formData);

    alert("Booking created! Reference: " + result.booking_reference);
  }

  return (
    <div>
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="property"
          placeholder="Property ID"
          onChange={handleChange}
        />

        <input
          name="guest_name"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          name="guest_email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="check_in"
          type="date"
          onChange={handleChange}
        />

        <input
          name="check_out"
          type="date"
          onChange={handleChange}
        />

        <button type="submit">Book Now</button>

      </form>
    </div>
  );
}

export default BookingPage;