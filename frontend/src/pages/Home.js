import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Home() {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    fetch(`${API}/properties/`)
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>Properties</h1>

      {data.map(p => (
        <div className="card" key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>£{p.price_per_night}</p>

          <button onClick={() => nav(`/book/${p.id}`)}>
            Book
          </button>
        </div>
      ))}
    </div>
  );
}