import React, { useState } from "react";
import { FaHandsHelping, FaTimesCircle, FaAmbulance, FaFire, FaShieldAlt, FaUserSecret, FaExclamationTriangle } from "react-icons/fa";
import "./Help.css";

const helpRequestsData = [
  { message: "I need immediate medical assistance!", icon: <FaAmbulance /> },
  { message: "There's a fire outbreak near me!", icon: <FaFire /> },
  { message: "I'm feeling unsafe, please help!", icon: <FaShieldAlt /> },
  { message: "I've witnessed an accident, need emergency support!", icon: <FaExclamationTriangle /> },
  { message: "Someone is in danger, urgent help required!", icon: <FaUserSecret /> },
  { message: "Lost in an unfamiliar place, need guidance!", icon: <FaExclamationTriangle /> },
  { message: "A crime is happening, please send the police!", icon: <FaShieldAlt /> },
  { message: "I'm injured and can't move, need help!", icon: <FaAmbulance /> },
  { message: "A child is missing, urgent community alert!", icon: <FaUserSecret /> },
  { message: "Stranded alone, need immediate assistance!", icon: <FaExclamationTriangle /> },
];

const HelpRequest = () => {
  const [helpRequests, setHelpRequests] = useState(helpRequestsData);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const sendHelpRequest = () => {
    if (helpRequests.length > 0) {
      setPopupMessage("🚨 Emergency Sent Successfully!");
      setShowPopup(true);
    }
  };

  const cancelHelpRequest = (index) => {
    const updatedRequests = helpRequests.filter((_, i) => i !== index);
    setHelpRequests(updatedRequests);
    setPopupMessage("❌ Help Request Cancelled!");
    setShowPopup(true);
  };

  return (
    <div className="help-page">
      <h2>🆘 Request Help</h2>
      <FaHandsHelping className="icon-large" />
      <p>Your emergency request will be sent to:</p>
      <ul>
        <li>Community Members</li>
        <li>Police Department</li>
        <li>Hospitals & Emergency Services</li>
      </ul>

      <button className="sos-button" onClick={sendHelpRequest}>
        🚨 Send Emergency Request
      </button>

      {helpRequests.length > 0 && (
        <div className="requests">
          <h3>📜 Active Help Requests</h3>
          <div className="request-cards">
            {helpRequests.map((request, index) => (
              <div key={index} className="request-card">
                <div className="request-icon">{request.icon}</div>
                <p>{request.message}</p>
                <FaTimesCircle className="cancel-icon" onClick={() => cancelHelpRequest(index)} />
              </div>
            ))}
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button className="close-popup" onClick={() => setShowPopup(false)}>OK</button>
        </div>
      )}
    </div>
  );
};

export default HelpRequest;
