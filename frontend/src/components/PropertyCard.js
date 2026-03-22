import React, { useState } from "react";
import BookingForm from "./BookingForm";
import "./PropertyCard.css";

function PropertyCard({ property }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="property-card">
      <img src={property.image} alt={property.name} className="property-image" />

      <div className="property-info">
        <h3>{property.name}</h3>
        <p>{property.location}</p>
        <p>{property.property_type}</p>
        <p>£{property.price_per_night} / night</p>

        <button onClick={() => setShowForm(true)}>Book Now</button>

        {showForm && (
          <BookingForm
            property={property}
            onClose={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default PropertyCard;