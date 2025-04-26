import React from "react";
import { Button } from "flowbite-react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logged out successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <p>Welcome! You are now logged in. 🎉</p>
      <Button onClick={handleLogout} color="failure">
        Logout
      </Button>
    </div>
  );
}

export default DashboardPage;
