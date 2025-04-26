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
        <form
          onSubmit={signUp}
          className="signup-form"
          aria-label="Signup Form"
        >
          <h1>Signup Page</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              aria-required="true"
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
              placeholder="Enter your email"
              required
              aria-required="true"
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
              placeholder="Enter your password"
              required
              aria-required="true"
            />
          </div>
          <Button type="submit" className="signup-button">
            Sign up
          </Button>
        </form>
      </div>
      <Button
        onClick={navigateTologin}
        color="purple"
        className="login-redirect-button"
      >
        Already have an account? Go to login
      </Button>
    </div>
  );
}

export default SignupPage;
