import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();

  const handlenavigateTologin = () => {
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <p>This is a simple landing page.</p>
      <Button
        onClick={handlenavigateTologin}
        color="success"
        className="login-button"
      >
        Log In
      </Button>
    </div>
  );
}

export default LandingPage;
