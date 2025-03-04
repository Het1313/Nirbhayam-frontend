import { useState, useEffect } from "react";
import axios from "axios";
import './sos.css'
export default function EmergencyAlert({ setEmergencyAlert }) {
  const [emergencyWord, setEmergencyWord] = useState("help");
  const [listening, setListening] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const [status, setStatus] = useState("Waiting for speech...");
  let intervalId = null;

  const setWord = async () => {
    try {
      await axios.post("http://127.0.0.1:5000/set_word", { word: emergencyWord });
      alert(`Emergency word set to: ${emergencyWord}`);
    } catch (error) {
      console.error("Error setting word", error);
    }
  };

  const startListening = async () => {
    setListening(true);
    setStatus("Listening...");

    intervalId = setInterval(async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/listen");
        setDetectedText(response.data.message);

        if (response.data.status === "alert_sent") {
          alert("🚨 Emergency alert sent!");
          setEmergencyAlert(true); // Notify App.js about the emergency
          clearInterval(intervalId);
          setListening(false);
          setStatus("Alert Sent!");
        }
      } catch (error) {
        console.error("Error listening", error);
      }
    }, 2000);
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="emergency-container">
      <div className="alert-box">
        <h2>Emergency Alert System</h2>
        <div>
          <label>Set Emergency Word:</label>
          <input
            type="text"
            value={emergencyWord}
            onChange={(e) => setEmergencyWord(e.target.value)}
            placeholder="Enter emergency word"
          />
          <button onClick={setWord} className="set-word-btn">
            Set Word
          </button>
        </div>

        <div className="status-section">
          <button onClick={startListening} disabled={listening} className="listen-btn">
            {listening ? "Listening..." : "Start Listening"}
          </button>
          <p className="status-text">{status}</p>
          {detectedText && <p className="detected-text">Detected: {detectedText}</p>}
        </div>
      </div>
    </div>
  );
}
