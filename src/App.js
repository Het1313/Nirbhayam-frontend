import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import pic_1 from './assets/Back1.jpg';
import image_3 from './assets/real-time-alerts.webp';
import image_4 from './assets/acs_202205-036.webp';
import image_5 from './assets/map-apps-for-multiple-stops--640x360.webp';
import helpimg from './assets/help.webp';
import why from './assets/why.webp';
import Hero from './components/Hero';
import Slider from './components/Slider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import EmergencyAlert from './components/SOSAI';
import UserDashboard from "./components/UserDashboard";
import CommunityDashboard from "./components/CommunityDashboard";
import Places from "./components/Places"
import Community from './components/Community';
import HelpRequest from './components/HelpRequest';
import Contact from './components/Contact';

const navBarLinks = [
  { url: "/", title: "Home" },
  { url: "/places", title: "Places" },
  { url: "/community", title: "Community" },
  { url: "/help", title: "Help Requests" },
  // { url: "/dashboard", title: "Dashboard" },
  { url: "/contact", title: "Contact" },
  { url: "/login", title: "Log In" },
  // { url: "/sos", title: "SOS" }
];

function App() {
  const [emergencyAlert, setEmergencyAlert] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    // Update local storage whenever role changes
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
  }, [role]);

  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#000', color: '#fff' }}>
        <Navbar navBarLinks={navBarLinks} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero imageSrc={pic_1} emergencyAlert={emergencyAlert} />
              <Slider imageSrc={image_5} title="Find the Safest Route" subtitle="Get AI-powered shortest and safest route suggestions in real-time." />
              <Slider imageSrc={image_4} title="Community Support" subtitle="Reach out to community members for immediate assistance when in danger." flipped={true} />
              <Slider imageSrc={image_3} title="Real-Time Alerts" subtitle="Receive instant notifications and alerts about high-risk areas." />
              <Slider imageSrc={helpimg} title="Help & FAQ" subtitle="Learn how Nirbhayam works, how to request help, and how we ensure privacy." sectionId="faq" flipped={true} />
              <Slider imageSrc={why} title="Why Nirbhayam?" subtitle="Nirbhayam aims to create a safer environment using AI, real-time alerts, and community support." sectionId="motive" />
              <Footer />
            </>
          } />
          <Route path="/login" element={<LoginPage onLogin={setRole} />} />
          <Route path="/sos" element={<EmergencyAlert setEmergencyAlert={setEmergencyAlert} />} />

          {/* Redirect users to their respective dashboards after login */}
          <Route path="/dashboard" element={
            role === "user" ? <Navigate to="/user-dashboard" /> :
            role === "community" ? <Navigate to="/community-dashboard" /> :
            <Navigate to="/login" />
          } />
          
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/community-dashboard" element={<CommunityDashboard /> } />
          <Route path="/places" element={<Places /> } />
          <Route path="/community" element={<Community /> } />
          <Route path="/help" element={<HelpRequest /> } />
          <Route path="/contact" element={<Contact /> } />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
