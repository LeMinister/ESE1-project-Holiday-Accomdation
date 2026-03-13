import React, { useEffect, useState } from 'react';
import './Properties.css';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/properties/')
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="properties-container">
      <h2>Available Properties</h2>
      {properties.length === 0 && <p>No properties available yet.</p>}
      <ul>
        {properties.map((prop) => (
          <li key={prop.id}>
            <h3>{prop.name}</h3>
            <p>{prop.description}</p>
            <p>Price per night: ${prop.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;