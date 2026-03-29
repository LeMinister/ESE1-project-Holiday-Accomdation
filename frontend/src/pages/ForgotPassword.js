import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://super-chainsaw-pjgv7q7v46pjc6g9q-8000.app.github.dev/api/forgot-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;