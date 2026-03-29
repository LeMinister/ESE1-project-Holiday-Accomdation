import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({});

  const submit = async () => {
    await fetch(`${API}/register/`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });

    alert("Registered!");
    nav("/login");
  };

  return (
    <div>
      <h1>Register</h1>
      <input onChange={e=>setForm({...form, username:e.target.value})}/>
      <input onChange={e=>setForm({...form, email:e.target.value})}/>
      <input type="password" onChange={e=>setForm({...form, password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </div>
  );
}