const API_BASE = "http://127.0.0.1:8000/api";

export async function getProperties() {
  const res = await fetch(`${API_BASE}/properties/`);
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/bookings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}