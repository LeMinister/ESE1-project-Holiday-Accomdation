import React from "react";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const handleBookNow = () => {
    const user = localStorage.getItem("user_id");

    if (!user) {
      window.location.href = "/register";
    } else {
      window.location.href = `/book/${property.id}`;
    }
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.name} />
      <h3>{property.name}</h3>
      <p>£{property.price_per_night}</p>

      <button onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
}

export default PropertyCard;