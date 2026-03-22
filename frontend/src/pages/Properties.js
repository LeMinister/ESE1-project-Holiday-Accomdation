import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import "./Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/properties/")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading properties...</p>;
  }

  return (
    <div className="properties-page">
      <h2 className="title">Available Accommodations</h2>

      {properties.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No properties available yet.
        </p>
      ) : (
        properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      )}
    </div>
  );
}

export default Properties;