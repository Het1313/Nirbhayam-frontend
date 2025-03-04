import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import "./Places.css";
import policeStation from "../assets/policeStation.jpg";
import hospital from "../assets/medicalcenter.jpg";
import fireStation from "../assets/fire.webp";

const places = [
  {
    name: "Police Station",
    address: "XYZ Road, City Center",
    contact: "100",
    image: policeStation,
  },
  {
    name: "Hospital",
    address: "ABC Avenue, Near Metro",
    contact: "108",
    image: hospital,

  },
  {
    name: "Fire Station",
    address: "123 Main Street",
    contact: "101",
    image: fireStation,
  },
];

const Places = () => {
  return (
    <div className="page">
      <h2>📍 Emergency Places</h2>
      <div className="cards">
        {places.map((place, index) => (
          <div className="card" key={index}>
            <img src={place.image} alt={place.name} className="card-image" />
            <div className="card-content">
              <h3>
                <FaMapMarkerAlt className="icon" /> {place.name}
              </h3>
              <p>{place.address}</p>
              <p>
                <FaPhoneAlt className="phone-icon" /> Emergency: {place.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Places;
