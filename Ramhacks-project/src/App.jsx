import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);

  return (
    <>
      <div className="App">{routes}</div>
    </>
  );
}

export default App;
