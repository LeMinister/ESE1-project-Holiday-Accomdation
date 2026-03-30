import { useEffect, useState } from "react";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    fetch(`https://super-chainsaw-pjgv7q7v46pjc6g9q-8000.app.github.dev/api/bookings?user_id=${user_id}`)
      .then(res => res.json())
      .then(setBookings);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b.property_name}</h3>
          <p>{b.check_in}</p>
          <p>{b.check_out}</p>
          <p>{b.booking_reference}</p>
        </div>
      ))}
    </div>
  );
}