import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import "./Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);


  const API_URL =
    "https://super-chainsaw-pjgv7q7v46pjc6g9q-8000.app.github.dev/api/properties/";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API DATA:", data); // 🔍 helps debug
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, [API_URL]);

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
        <div className="properties-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Properties;