import { useState } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";

function App() {
  const routes = useRoutes([]);

  return (
    <>
      <div className="App">{routes}</div>
    </>
  );
}

export default App;
