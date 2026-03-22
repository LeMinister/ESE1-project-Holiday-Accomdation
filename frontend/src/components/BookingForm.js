import React, { useState } from "react";

function BookingForm({ property, onClose }) {
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    check_in: "",
    check_out: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        property: property.id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Booking created! Reference: " + data.booking_reference);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div style={{ background: "#eee", padding: "20px", marginTop: "10px" }}>
      <h4>Book {property.name}</h4>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="guest_name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="email"
          name="guest_email"
          placeholder="Your Email"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="date"
          name="check_in"
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="date"
          name="check_out"
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Confirm Booking</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default BookingForm;