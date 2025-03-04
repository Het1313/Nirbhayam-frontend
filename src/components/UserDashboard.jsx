// import React, { useState } from "react";
// import axios from "axios";
// import EmergencyAlert from "./SOSAI"; // Import the EmergencyAlert component
// import "./UserDashboard.css";

// const UserDashboard = () => {
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState(null);

//   const userId = "123"; // Replace with actual user ID from authentication

//   const sendRequest = async (customMessage = "") => {
//     const emergencyMessage = customMessage || message;

//     if (!emergencyMessage) {
//       alert("❌ Please enter your emergency message.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/send_request", {
//         userId,
//         message: emergencyMessage,
//         timestamp: new Date().toISOString(),
//       });

//       setStatus(`✅ ${response.data.message}`);
//       setMessage(""); 
//     } catch (error) {
//       setStatus("❌ Failed to send request. Please try again.");
//     }
//   };

//   const triggerSOS = () => {
//     sendRequest("🚨 SOS! Immediate Help Needed! 🚨");
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>🚨 User Dashboard</h2>

//       <EmergencyAlert />

//       <button className="sos-button" onClick={triggerSOS}>
//         🔴 SOS Emergency
//       </button>

//       <textarea
//         placeholder="Describe your emergency..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />

//       <button onClick={() => sendRequest()}>Send Emergency Request</button>

//       {status && <p className="status-message">{status}</p>}
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState } from "react";
import axios from "axios";
import EmergencyAlert from "./SOSAI";
import "./UserDashboard.css";
import policeImg from "../assets/Police.jpeg"
import abhayamImg from "../assets/Abhayam.jpeg"
import hospitalImg from "../assets/Hospitals.jpeg"
import nirImg from "../assets/Nirbhayam.jpeg"

const UserDashboard = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const userId = "123"; // Replace with actual user ID from authentication

  const sendRequest = async (customMessage = "") => {
    const emergencyMessage = customMessage || message;

    if (!emergencyMessage) {
      alert("❌ Please enter your emergency message.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/send_request", {
        userId,
        message: emergencyMessage,
        timestamp: new Date().toISOString(),
      });

      setStatus(`✅ ${response.data.message}`);
      setMessage("");
    } catch (error) {
      setStatus("❌ Failed to send request. Please try again.");
    }
  };

  const triggerSOS = () => {
    sendRequest("🚨 SOS! Immediate Help Needed! 🚨");
  };

  return (
    <div className="dashboard-container">
      <h2>🚨 User Dashboard</h2>
      <EmergencyAlert />
      {/* <button className="sos-button" onClick={triggerSOS}>🔴 SOS Emergency</button>

      <textarea
        placeholder="Describe your emergency..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => sendRequest()}>Send Emergency Request</button>
      {status && <p className="status-message">{status}</p>} */}

      {/* Emergency Services Cards */}
      <div className="emergency-services">
  <div className="card">
    <img src={policeImg} alt="Police" className="card-image" />
    <h3>🚓 Police</h3>
    <p>Contact the nearest police station for immediate assistance.</p>
  </div>
  <div className="card">
    <img src={nirImg} alt="Nirbhayam" className="card-image" />
    <h3>🛡️ Nirbhayam</h3>
    <p>Human safety initiative providing rapid response & support.</p>
  </div>
  <div className="card">
    <img src={abhayamImg} alt="Abhayam" className="card-image" />
    <h3>🚑 Abhayam</h3>
    <p>24/7 emergency helpline offering protection & rescue services.</p>
  </div>
  <div className="card">
    <img src={hospitalImg} alt="Hospitals" className="card-image" />
    <h3>🏥 Hospitals</h3>
    <p>Find the nearest hospital for medical emergencies.</p>
  </div>
</div>


      {/* Safety Tips Section */}
      <div className="safety-tips">
        <h3>🛑 Safety Tips</h3>
        <ul>
          <li>Stay aware of your surroundings, especially at night.</li>
          <li>Share your live location with a trusted contact when traveling.</li>
          <li>Use emergency helplines when in distress.</li>
          <li>Keep your phone charged & emergency contacts saved.</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
