import { useEffect, useState } from "react";
import { apiRequest } from "../apiRequest";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/bookings/")
      .then(setBookings)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map(b => (
          <div key={b.id}>
            <p>Property: {b.property}</p>
            <p>Date: {b.date}</p>
          </div>
        ))
      )}
    </div>
  );
}