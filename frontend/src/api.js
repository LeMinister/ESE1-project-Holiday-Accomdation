const BASE_URL = "https://super-chainsaw-pjgv7q7v46pjc6g9q-8000.app.github.dev/api/";

async function register(data) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function login(data) {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function createBooking(data) {
  const res = await fetch(`${BASE_URL}/book/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

async function getBookings(userId) {
  const res = await fetch(`${BASE_URL}/bookings/?user_id=${userId}`);
  return res.json();
}

// 👇 SINGLE CLEAN EXPORT (avoids your error)
const API = {
  register,
  login,
  createBooking,
  getBookings,
};

export default API;