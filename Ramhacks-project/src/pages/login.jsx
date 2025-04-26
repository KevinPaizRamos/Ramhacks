import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login button clicked");
    // Redirect to another page after login
    navigate("/"); // Redirect to the landing page or any other page
  };

  const navigateToSignup = () => {
    navigate("/signup"); // Redirect to the signup page
  };

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <Button color="alternative">LogIn</Button>
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
