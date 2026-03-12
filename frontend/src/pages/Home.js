import React, { useEffect, useState } from "react";
import { getProperties } from "../services/api";

function Home() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  return (
    <div>
      <h1>Holiday Accommodation</h1>

      {properties.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.location}</p>
          <p>£{p.price_per_night}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;