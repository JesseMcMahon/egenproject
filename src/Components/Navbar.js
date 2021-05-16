import React, { useEffect, useState } from "react";
import "../style.css";
const Navbar = () => {
  // const [darkMode, setDarkMode] = useState(false);
  // const themeContainer = document.getElementById("theme-container");
  // const changeTheme = () => {
  //   setDarkMode(!darkMode);
  //   if (darkMode === false) {
  //     themeContainer.classList.add("make-dark");
  //     themeContainer.classList.remove("make-light");
  //   } else {
  //     themeContainer.classList.add("make-light");
  //     themeContainer.classList.remove("make-dark");
  //   }
  // };
  return (
    // <div id="theme-container" className="navbar-container">
    //   <div>
    //     <h1 className="page-title">devjobs</h1>
    //   </div>
    //   <div className={darkMode ? "dark-mode" : "light-mode"}>
    //     <div className="toggle-container">
    //       <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
    //       <div className="switch-checkbox">
    //         <label className="switch">
    //           {/* <input type="checkbox" onChange={() => setDarkMode(!darkMode)} /> */}
    //           <input onClick={changeTheme} type="checkbox" />
    //           <span className="slider round"> </span>
    //         </label>
    //       </div>
    //       <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
    //     </div>
    //   </div>
    // </div>

    <div className="navbar-container">
      <div>
        <h1 className="page-title">devjobs</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
