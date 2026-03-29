import React, { useState } from "react";
import { useParams } from "react-router-dom";

function BookProperty() {
  const { id } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const response = await fetch("http://127.0.0.1:8000/api/book/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: id,
        user_id: user.id,
        start_date: startDate,
        end_date: endDate,
      }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Property</h2>

      <label>Start Date:</label>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />

      <br /><br />

      <label>End Date:</label>
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <br /><br />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookProperty;