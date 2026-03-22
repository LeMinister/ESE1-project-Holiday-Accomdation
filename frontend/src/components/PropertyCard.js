import React from "react";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <img
        src={property.image}
        alt={property.name}
        className="property-image"
      />

      <div className="property-info">
        <h3>{property.name}</h3>

        <p><strong>Location:</strong> {property.location}</p>

        <p><strong>Type:</strong> {property.property_type}</p>

        <p className="price">£{property.price_per_night} / night</p>

        <button className="book-btn">Book Now</button>
      </div>
    </div>
  );
}

export default PropertyCard;