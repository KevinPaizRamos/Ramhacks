import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Signing in...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully!");
      navigate("/dashboard"); // Redirect to the landing page or any other page
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };
  
  const navigateToSignup = () => {
  navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form onSubmit={signIn}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="text" 
            id="email" 
            name="email" 
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
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <Button type="submit" color="alternative">Log In</Button>
      </form>
      <Button
        onClick={navigateToSignup}
        color="success"
        className="login-button"
      >
        Create an account
      </Button>
    </div>
  );
}

export default LoginPage;