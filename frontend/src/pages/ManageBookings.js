import { useEffect, useState } from "react";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user");

    fetch(`http://localhost:8000/api/bookings/${user_id}/`)
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Bookings</h1>

      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((b, i) => (
        <div
          key={i}
          style={{
            background: "#102a4c",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "10px",
            color: "white"
          }}
        >
          <h3>{b.property__name}</h3>
          <p>Check-in: {b.check_in}</p>
          <p>Check-out: {b.check_out}</p>
          <p><b>Ref:</b> {b.booking_reference}</p>
        </div>
      ))}
    </div>
  );
}