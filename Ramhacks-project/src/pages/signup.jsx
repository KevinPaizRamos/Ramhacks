import React, { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import "./signup.css"; // Import your CSS file for styling

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const navigateTologin = () => {
    navigate("/login"); // Redirect to the login page
  };

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Optional: Update the user's display name
      await updateProfile(user, {
        displayName: username,
      });

      console.log("Sign-up successful!");
      navigate("/login"); // Redirect to the homepage after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <form onSubmit={signUp} className="signup-form">
          <h1>Signup Page</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button>Sign up</Button>
        </form>
      </div>
      <Button onClick={navigateTologin} className="login-button">
        Already have an account? go to login
      </Button>
    </div>
  );
}

export default SignupPage;
