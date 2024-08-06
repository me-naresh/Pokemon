import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import CustomeRoute from "./routes/CustomeRoutes.jsx";

function App() {
  return (
    <div className="app">
      <div className="pokedex">
        <h1 className="heading">
          <Link to="/">pokedex</Link>
        </h1>
      </div>

      <CustomeRoute />
    </div>
  );
}

export default App;
