import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import "./landing.css"; // Import your CSS file for styling
function LandingPage() {
  const navigate = useNavigate();

  const handlenavigateTologin = () => {
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="Button_and_Logo">

      <img src="LifelineAI Logo Design (1).png" alt="Logo" className="logo" />
      <div>
        <button onClick = {handlenavigateTologin} className="login-button">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
