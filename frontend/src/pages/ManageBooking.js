import React, { useState } from "react";

function ManageBooking() {

  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);

  function searchBooking() {

    fetch(`http://127.0.0.1:8000/api/bookings/?booking_reference=${reference}`)
      .then(res => res.json())
      .then(data => {
        setBooking(data[0]);
      });
  }

  return (
    <div>

      <h2>Manage Booking</h2>

      <input
        placeholder="Enter booking reference"
        value={reference}
        onChange={e => setReference(e.target.value)}
      />

      <button onClick={searchBooking}>Search</button>

      {booking && (

        <div>

          <h3>Booking Details</h3>

          <p>Name: {booking.guest_name}</p>

          <p>Email: {booking.guest_email}</p>

          <p>Check in: {booking.check_in}</p>

          <p>Check out: {booking.check_out}</p>

        </div>

      )}

    </div>
  );
}

export default ManageBooking;