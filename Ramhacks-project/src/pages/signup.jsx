import React from "react";

function SignupPage() {
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
    </div>
  );
}
export default SignupPage;
