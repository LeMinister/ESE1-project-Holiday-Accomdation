import React, { useEffect, useState } from "react";

function Properties() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/properties/")
      .then(res => res.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div>

      <h2>Available Properties</h2>

      {properties.map(property => (

        <div key={property.id}>

          <h3>{property.name}</h3>

          <p>{property.location}</p>

          <p>£{property.price_per_night} per night</p>

        </div>

      ))}

    </div>
  );
}

export default Properties;