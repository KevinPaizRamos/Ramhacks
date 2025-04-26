import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const navigateTologin = () => {
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className="signup-page">
      <h1>Signup Page</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Signup</button>
      </form>
      <Button
        onClick={navigateTologin}
        color="success"
        className="signup-button"
      >
        Already have an account? Log In
      </Button>
    </div>
  );
}
export default SignupPage;
