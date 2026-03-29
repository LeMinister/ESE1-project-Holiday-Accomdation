import React, { useState } from "react";
import { useParams } from "react-router-dom";

function BookProperty() {
  const { id } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/register";
      return;
    }

    try {
      const response = await fetch("https://super-chainsaw-pjgv7q7v46pjc6g9q-8000.app.github.dev/api/book/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          property_id: id,
          start_date: startDate,
          end_date: endDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Booking successful!");
      } else {
        alert(data.error || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error booking property");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Book Property</h2>

      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookProperty;