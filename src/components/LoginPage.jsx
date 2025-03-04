import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./login.css";

const AuthForm = ({ emergencyAlert }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [faceImage, setFaceImage] = useState(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [faceRequired, setFaceRequired] = useState(false);

  const webcamRef = useRef(null);
  const navigate = useNavigate(); // ✅ Define navigate

  useEffect(() => {
    if (role === "community" && !isLogin) {
      setCameraEnabled(true);
      setFaceRequired(true);
    } else {
      setCameraEnabled(false);
      setFaceRequired(false);
      setFaceImage(null);
    }
  }, [role, isLogin]);

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({ width: 150, height: 150 });
      setFaceImage(imageSrc);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";

    if (isLogin) {
        // 🔥 Fix: Send JSON data instead of FormData
        try {
            const response = await axios.post("http://localhost:5000/login", 
            {
                email: email,
                password: password,
                role: role,
            }, 
            {
                headers: { "Content-Type": "application/json" }, // ✅ Correct Content-Type
            });

            alert(response.data.message);

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                console.log("User role:", response.data.role); // ✅ Debugging role

                // ✅ Redirect based on role
                if (response.data.role === "community") {
                    navigate("/community-dashboard");
                } else if (response.data.role === "user") {
                    navigate("/user-dashboard");
                } else {
                    console.error("Unknown role:", response.data.role);
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    } else {
        // 🔥 Registration: Use FormData only for file uploads
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);

        if (role === "community") {
            if (!faceImage) {
                alert("⚠️ Face recognition is required for community registration.");
                return;
            }
            const blob = await fetch(faceImage).then((res) => res.blob());
            formData.append("face_image", blob, "face.jpg");
        }

        try {
            const response = await axios.post("http://localhost:5000/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(response.data.message);
            setIsLogin(true); // ✅ Switch to login after successful signup
        } catch (error) {
            alert(error.response?.data?.message || "Something went wrong");
        }
    }
};


  return (
    <div className="auth-container">
      <div className="auth-form">
        {emergencyAlert && <p className="hero__alert">🚨 Emergency Alert Triggered!</p>}
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleAuth}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="community">Community</option>
          </select>

          {/* Face Recognition for Community Registration Only */}
          {faceRequired && cameraEnabled && (
            <div className="webcam-container">
              <p>📷 Face recognition is required for community registration</p>
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={150} height={150} />
              <button type="button" onClick={captureImage}>📸 Capture Face</button>
              {faceImage && <img src={faceImage} alt="Captured" className="captured-img" />}
            </div>
          )}

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
