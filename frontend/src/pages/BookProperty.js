import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function Book() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({});

  const submit = async () => {
    const user = localStorage.getItem("user");

    const res = await fetch(`${API}/book/`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        user_id: user,
        property_id: id,
        ...form
      })
    });

    const data = await res.json();

    alert("Booking ref: " + data.reference);
    nav("/bookings");
  };

  return (
    <div>
      <h1>Book</h1>
      <input type="date" onChange={e=>setForm({...form, check_in:e.target.value})}/>
      <input type="date" onChange={e=>setForm({...form, check_out:e.target.value})}/>
      <button onClick={submit}>Confirm</button>
    </div>
  );
}