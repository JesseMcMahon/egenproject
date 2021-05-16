import "./style.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Route exact path="/" component={Dashboard} />
      </Router>
    </>
  );
}

export default App;
