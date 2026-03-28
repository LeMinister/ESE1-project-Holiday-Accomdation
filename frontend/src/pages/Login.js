import React, { useState } from "react";

function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/login/", {
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
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Login</button>
      </form>

      <br />

      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default Login;