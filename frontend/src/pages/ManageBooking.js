import React, { useState } from "react";

function ManageBooking() {
  const [reference, setReference] = useState("");
  const [booking, setBooking] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  const handleDelete = () => {
    fetch(`http://127.0.0.1:8000/api/bookings/${booking.id}/`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Booking cancelled");
        setBooking(null);
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/bookings/${booking.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(booking)
    })
      .then(res => res.json())
      .then(data => {
        setBooking(data);
        setEditMode(false);
        alert("Booking updated");
      })
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value
    });
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

          {editMode ? (
            <>
              <p>
                Check-in:
                <input
                  type="date"
                  name="check_in"
                  value={booking.check_in}
                  onChange={handleChange}
                />
              </p>

              <p>
                Check-out:
                <input
                  type="date"
                  name="check_out"
                  value={booking.check_out}
                  onChange={handleChange}
                />
              </p>

              <button onClick={handleUpdate}>Save Changes</button>
            </>
          ) : (
            <>
              <p><strong>Check-in:</strong> {booking.check_in}</p>
              <p><strong>Check-out:</strong> {booking.check_out}</p>

              <button onClick={() => setEditMode(true)}>
                Edit Booking
              </button>
            </>
          )}

          <br /><br />

          <button onClick={handleDelete} style={{ color: "red" }}>
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageBooking;