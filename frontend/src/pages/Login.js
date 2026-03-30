import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../apiRequest";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiRequest("/token/", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      nav("/");

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}