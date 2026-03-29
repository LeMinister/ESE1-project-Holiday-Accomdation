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
        {/* ✅ PROPERTY NAME */}
        <h3 className="property-title">{property.name}</h3>

        {/* ✅ PROPERTY LOCATION (optional but nice) */}
        <p className="property-location">{property.location}</p>

        {/* ✅ DESCRIPTION */}
        <p className="property-description">{property.description}</p>

        {/* ✅ PRICE */}
        <p className="price">£{property.price_per_night} / night</p>

        <button className="book-btn">Book Now</button>
      </div>
    </div>
  );
}

export default PropertyCard;