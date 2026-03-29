const API_BASE = "https://super-chainsaw-8000.app.github.dev/api/";

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