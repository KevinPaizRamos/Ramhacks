import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        email: currentUser.email,
        username: currentUser.displayName, // You set this during signup!
      });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>

      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username ? user.username : "No username set"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      <Button onClick={handleLogout} color="failure" className="mt-4">
        Logout
      </Button>
    </div>
  );
}

export default DashboardPage;