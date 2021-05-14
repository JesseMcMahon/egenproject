import React, { useState } from "react";
import "../style.css";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="navbar-container">
      <div>
        <h1 className="page-title">devjobs</h1>
      </div>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <div className="toggle-container">
          <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
          <div className="switch-checkbox">
            <label className="switch">
              <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
              <span className="slider round"> </span>
            </label>
          </div>
          <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
