import React from "react";
import { FaUsers, FaPhoneAlt } from "react-icons/fa";
import "./Community.css";
import profile1 from "../assets/profile1.webp"
import profile2 from "../assets/profile2.webp"


const community = [
  {
    name: "John Doe",
    role: "Community Responder",
    contact: "+91 98765 43210",
    image: profile1, // ✅ Make sure images are placed in 'public/assets/'
  },
  {
    name: "Jane Smith",
    role: "Emergency Volunteer",
    contact: "+91 87654 32109",
    image: profile2, // ✅ Make sure images are placed in 'public/assets/'
  },
];

const Community = () => {
  return (
    <div className="page">
      <h2>🤝 Community Support</h2>
      <p className="description">
        Meet our dedicated community members who are always ready to help in emergencies.
      </p>
      <div className="cards">
        {community.map((member, index) => (
          <div className="card" key={index}>
            <img src={member.image} alt={member.name} className="profile-img" />
            <div className="card-content">
              <h3>
                <FaUsers className="icon" /> {member.name}
              </h3>
              <p className="role">{member.role}</p>
              <p className="contact">
                <FaPhoneAlt className="phone-icon" /> {member.contact}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
