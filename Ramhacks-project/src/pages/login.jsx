import React, { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault(); // Prevent page refresh
    console.log("Signing in...");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;