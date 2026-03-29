import React from "react";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    // If NOT logged in → go to register
    if (!token) {
      window.location.href = "/register";
    } else {
      // If logged in → go to booking page
      window.location.href = `/book/${property.id}`;
    }
  };

  return (
    <div className="property-card">
      <img
        src={property.image}
        alt={property.name}
        className="property-image"
      />

      <div className="property-info">
        <h3>{property.name}</h3>

        <p className="property-type">{property.property_type}</p>

        <p className="property-price">
          £{property.price_per_night} / night
        </p>

        <button className="book-btn" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;