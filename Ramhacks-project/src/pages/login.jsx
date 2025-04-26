import React from "react";
import { Button } from "flowbite-react";

function LoginPage() {
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
        <Button color="alternative">Alternative</Button>
      </form>
    </div>
  );
}

export default LoginPage;
