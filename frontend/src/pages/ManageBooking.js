import React, { useState } from "react";

function ManageBooking() {
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);

  const handleSearch = () => {
    fetch(`http://127.0.0.1:8000/api/bookings/?search=${reference}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setBooking(data[0]);
        } else {
          alert("Booking not found");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Booking</h2>

      <input
        placeholder="Enter booking reference"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {booking && (
        <div style={{ marginTop: "20px" }}>
          <h3>Booking Details</h3>

          <p><strong>Reference:</strong> {booking.booking_reference}</p>
          <p><strong>Name:</strong> {booking.guest_name}</p>
          <p><strong>Email:</strong> {booking.guest_email}</p>
          <p><strong>Check-in:</strong> {booking.check_in}</p>
          <p><strong>Check-out:</strong> {booking.check_out}</p>
        </div>
      )}
    </div>
  );
}

export default ManageBooking;