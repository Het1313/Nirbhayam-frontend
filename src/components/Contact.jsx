import React from "react";
import { FaPhoneAlt, FaAmbulance, FaFireExtinguisher, FaShieldAlt } from "react-icons/fa";
import "./Contact.css";

const contacts = [
  { service: "Police", number: "100", icon: <FaShieldAlt />, color: "#007bff" },
  { service: "Hospital", number: "108", icon: <FaAmbulance />, color: "#28a745" },
  { service: "Fire Department", number: "101", icon: <FaFireExtinguisher />, color: "#dc3545" },
  { service: "Abhayam", number: "181", icon: <FaPhoneAlt />, color: "#ff8800" },
];

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>📞 Emergency Contact Services</h2>
      <p className="description">
        Get instant access to emergency services. Dial the numbers below in case of urgent help.
      </p>
      <div className="contact-cards">
        {contacts.map((contact, index) => (
          <div className="contact-card" key={index} style={{ borderLeft: `5px solid ${contact.color}` }}>
            <div className="icon-container" style={{ backgroundColor: contact.color }}>
              {contact.icon}
            </div>
            <div className="contact-info">
              <h3>{contact.service}</h3>
              <p className="number">
                <FaPhoneAlt className="phone-icon" /> {contact.number}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
