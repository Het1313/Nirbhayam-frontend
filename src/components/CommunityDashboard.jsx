import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { io } from "socket.io-client";
import "./CommunityDashboard.css";

const socket = io("http://localhost:5000");

const quotes = [
  "Helping one person might not change the whole world, but it could change the world for one person.",
  "The best way to find yourself is to lose yourself in the service of others.",
  "No one has ever become poor by giving – Anne Frank",
  "Safety is a small investment for a rich future.",
  "Be the reason someone feels safe today."
];

const CommunityDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [stats, setStats] = useState({ total: 0, accepted: 0 });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get_requests");
        setRequests(response.data);
        setStats({ total: response.data.length, accepted: 0 }); 
      } catch (error) {
        setError("❌ Failed to load requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();

    // Update motivational quote every 10 seconds
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000);

    // Listen for new emergency requests
    socket.on("new_request", (newRequest) => {
      setRequests((prevRequests) => [newRequest, ...prevRequests]);
      setStats((prev) => ({ ...prev, total: prev.total + 1 }));
    });

    socket.on("request_accepted", ({ requestId }) => {
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
      setStats((prev) => ({ ...prev, accepted: prev.accepted + 1 }));
    });

    return () => {
      clearInterval(quoteInterval);
      socket.off("new_request");
      socket.off("request_accepted");
    };
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      const response = await axios.post("http://localhost:5000/accept_request", { requestId });

      if (response.status === 200) {
        setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
        setStats((prev) => ({ ...prev, accepted: prev.accepted + 1 }));
        alert("✅ Request accepted! The user has been notified.");
      }
    } catch (error) {
      alert("❌ Failed to accept request. Please try again.");
    }
  };

  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🏠 Community Dashboard
      </motion.h2>

      {/* Motivational Quote Section */}
      <motion.div
        className="quote-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>💬 {quotes[quoteIndex]}</p>
      </motion.div>

      {/* Stats Section */}
      <div className="stats-container">
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <h3>🚨 Total Requests</h3>
          <p>{stats.total}</p>
        </motion.div>
        <motion.div className="stat-card" whileHover={{ scale: 1.05 }}>
          <h3>✅ Accepted Requests</h3>
          <p>{stats.accepted}</p>
        </motion.div>
      </div>

      {/* Emergency Requests Section */}
      {loading && <p>Loading requests...</p>}
      {error && <p className="error-message">{error}</p>}

      {requests.length === 0 && !loading ? (
        <p>No pending requests.</p>
      ) : (
        requests.map((req) => (
          <motion.div
            key={req.id}
            className="request-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p><strong>Message:</strong> {req.message}</p>
            <p><strong>Timestamp:</strong> {new Date(req.timestamp).toLocaleString()}</p>
            <motion.button
              className="accept-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => acceptRequest(req.id)}
            >
              <FaCheckCircle /> Accept Request
            </motion.button>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default CommunityDashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaCheckCircle } from "react-icons/fa";
// import { io } from "socket.io-client";
// import "./CommunityDashboard.css";

// const socket = io("http://localhost:5000"); // Connect to WebSocket server

// const CommunityDashboard = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Fetch initial requests
//     const fetchRequests = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/get_requests");
//         setRequests(response.data);
//       } catch (error) {
//         setError("❌ Failed to load requests. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRequests();

//     // Listen for new emergency requests
//     socket.on("new_request", (newRequest) => {
//       setRequests((prevRequests) => [newRequest, ...prevRequests]);
//     });

//     // Remove accepted requests in real-time
//     socket.on("request_accepted", ({ requestId }) => {
//       setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
//     });

//     return () => {
//       socket.off("new_request");
//       socket.off("request_accepted");
//     };
//   }, []);

//   const acceptRequest = async (requestId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/accept_request", { requestId });

//       if (response.status === 200) {
//         setRequests((prevRequests) => prevRequests.filter((req) => req.id !== requestId));
//         alert("✅ Request accepted! The user has been notified.");
//       }
//     } catch (error) {
//       alert("❌ Failed to accept request. Please try again.");
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//         🏠 Community Dashboard
//       </motion.h2>

//       {loading && <p>Loading requests...</p>}
//       {error && <p className="error-message">{error}</p>}

//       {requests.length === 0 && !loading ? (
//         <p>No pending requests.</p>
//       ) : (
//         requests.map((req) => (
//           <motion.div
//             key={req.id}
//             className="request-card"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//           >
//             <p><strong>Message:</strong> {req.message}</p>
//             <p><strong>Timestamp:</strong> {new Date(req.timestamp).toLocaleString()}</p>
//             <button className="accept-btn" onClick={() => acceptRequest(req.id)}>
//               <FaCheckCircle /> Accept Request
//             </button>
//           </motion.div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CommunityDashboard;
