import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../apiRequest";

export default function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    apiRequest("/properties/")
      .then(setData)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Properties</h1>

      {error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

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