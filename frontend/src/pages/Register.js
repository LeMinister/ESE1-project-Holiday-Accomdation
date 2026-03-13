import React, { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
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
      alert("Account created!");
      console.log(data);
    });
  }

  return (
    <div>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>

      </form>
    </div>
  );
}

export default Register;