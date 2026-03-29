import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      // NOT LOGGED IN → REGISTER
      navigate("/register");
    } else {
      // LOGGED IN → BOOK PAGE
      navigate(`/book/${property.id}`);
    }
  };

  return (
    <div className="property-card">
      <img src={property.image} alt={property.name} />

      <div className="property-info">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        <p>£{property.price_per_night} / night</p>

        <button onClick={handleBooking} className="book-btn">
          Book Now
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;