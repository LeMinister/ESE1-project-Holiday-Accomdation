import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;