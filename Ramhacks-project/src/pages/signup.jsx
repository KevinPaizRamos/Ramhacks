import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import "./signup.css"; // Import your CSS file for styling

function SignupPage() {
  const navigate = useNavigate();

  const navigateTologin = () => {
    navigate("/login"); // Redirect to the login page
  };
  return (
    <div className="signup-page">
      <form className="form-container">
        <div>
          <div className="">
            <Label htmlFor="email1">Your email</Label>
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1">Your password</Label>
          </div>
          <TextInput id="password1" type="password" required />
        </div>

        <Button type="submit">Create Account</Button>
      </form>
    </div>
  );
}
export default SignupPage;
