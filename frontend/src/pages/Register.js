import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert("Account created successfully!");
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <br />

        <input name="email" placeholder="Email" onChange={handleChange} required />
        <br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;