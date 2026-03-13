import React, { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(res => res.json())
    .then(data => {
      alert("Login successful");
      console.log(data);
    })
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;