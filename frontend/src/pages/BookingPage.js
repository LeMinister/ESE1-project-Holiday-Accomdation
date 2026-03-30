import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { getAccessToken } from "../auth";

export default function Book() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    check_in: "",
    check_out: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = getAccessToken();

    if (!token) {
      setError("You must be logged in to book");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/book/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          property: id,
          check_in: form.check_in,
          check_out: form.check_out
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError("Booking failed");
        setLoading(false);
        return;
      }

      alert(`Booking successful! Ref: ${data.booking_reference}`);
      nav("/bookings");

    } catch (err) {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Book Property</h1>

      <form onSubmit={submitBooking}>
        <label>Check In</label>
        <input
          type="date"
          name="check_in"
          value={form.check_in}
          onChange={handleChange}
        />

        <label>Check Out</label>
        <input
          type="date"
          name="check_out"
          value={form.check_out}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}