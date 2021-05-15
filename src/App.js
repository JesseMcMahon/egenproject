import "./style.css";
import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import JobShowPage from "./Components/JobShowPage";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route exact path="/dashboard/jobs/:id" component={JobShowPage} /> */}
      </Router>
    </>
  );
}

export default App;
