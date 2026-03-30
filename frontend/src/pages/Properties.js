import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../api";
import "./Properties.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getProperties()
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