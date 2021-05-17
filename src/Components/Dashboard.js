import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { AiTwotoneFilter } from "react-icons/ai";
import JobShowPage from "./JobShowPage";
import "../style.css";
import "./dark.css";
import axios from "axios";
import { APIKEY } from "./config.js";

const Dashboard = () => {
  const [userCity, setUserCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayShowPage, setDisplayShowPage] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fullTimeSelected, setFullTimeSelected] = useState(false);
  const smallScreenLocationSearch = document.getElementById(
    "small-screen-location-search"
  );

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        successfulLookup,
        console.log
      );
    } else {
      console.log("not supported in this browser");
    }
  }, []);

  useEffect(() => {
    console.log("hello");
    axios
      .get("https://dry-fortress-73097.herokuapp.com/")
      .then((res) => console.log(res));
    console.log("wtf");
  }, []);

  const successfulLookup = async (position) => {
    const { latitude, longitude } = position.coords;
    await axios
      .get("http://localhost:5000/userlocation", {
        params: {
          APIKEY: APIKEY,
          latitude: latitude,
          longitude: longitude,
        },
      })
      .then((res) => console.log(res.data[0].address.city))
      .then(
        axios
          .get(
            `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=&full_time=&location=${userCity}`
          )
          .then((res) => setSearchResults(res.data))
      )
      .then(
        searchResults.length === 0
          ? axios
              .get(
                `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=engineer&full_time=&location=remote`
              )
              .then((res) => setSearchResults(res.data))
          : null
      );
  };

  const changeTheme = () => {
    const themeContainer = document.getElementById("theme-container");
    const bodyContainer = document.querySelector("body");
    console.log(themeContainer);
    setDarkMode(!darkMode);
    if (darkMode === false) {
      themeContainer.classList.add("make-dark");
      bodyContainer.classList.add("make-dark");
      themeContainer.classList.remove("make-light");
      bodyContainer.classList.remove("make-light");
    } else {
      themeContainer.classList.add("make-light");
      bodyContainer.classList.add("make-light");
      themeContainer.classList.remove("make-dark");
      bodyContainer.classList.remove("make-dark");
    }
  };

  const showSearchBar = () => {
    if (smallScreenLocationSearch.classList.contains("force-display-block")) {
      smallScreenLocationSearch.classList.remove("force-display-block");
      return;
    }
    smallScreenLocationSearch.classList.add("force-display-block");
  };

  const searchJobs = async (e) => {
    e.preventDefault();
    smallScreenLocationSearch.classList.remove("force-display-block");

    await axios
      .get(
        `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=${searchTerm}&full_time=${fullTimeSelected}&location=${searchLocation}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "https://thingproxy.freeboard.io",
          },
        }
      )
      .then((res) => setSearchResults(res.data));
  };

  const showJob = (job) => {
    setSelectedJob(job);
    setDisplayShowPage(true);
    console.log(job);
  };

  const closeModal = () => {
    setDisplayShowPage(false);
  };

  return (
    <div id="theme-container" className="dashboard-container make-light">
      <div className="toggle-container">
        <span style={{ color: darkMode ? "grey" : "yellow" }}>☀︎</span>
        <div className="switch-checkbox">
          <label className="switch">
            <input type="checkbox" onClick={changeTheme} />
            <span className="slider round"> </span>
          </label>
        </div>
        <span style={{ color: darkMode ? "#c96dfd" : "grey" }}>☽</span>
      </div>
      <form onSubmit={searchJobs} className="search-container">
        <div className="primary-search-div">
          <BiSearch className="icon search-icon" />
          <input
            className="job-filter"
            type="text"
            placeholder="Filter by title, company, expertise..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AiTwotoneFilter
            onClick={showSearchBar}
            className="icon filter-icon"
          />
        </div>
        <div className="secondary-search-div">
          <HiLocationMarker className="icon location-icon" />
          <input
            className="location-filter"
            type="text"
            placeholder="Filter by location..."
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Filter by location..."
          className="filter-search-div"
          id="small-screen-location-search"
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <div className="checkbox-search-container">
          <input
            type="checkbox"
            onClick={(e) => setFullTimeSelected(!fullTimeSelected)}
          />
          <p>Full Time Only</p>
          <button className="search-btn">Search</button>
        </div>
      </form>
      <div className="search-results">
        {searchResults
          ? searchResults.map((result) => (
              <div
                onClick={() => showJob(result)}
                key={result.id}
                className="result-container"
              >
                <div className="img-div">
                  <img className="result-img" src={result.company_logo} />
                </div>
                <p className="result-type">{result.type}</p>
                <h2 className="result-title">{result.title}</h2>
                <h3 className="result-company">{result.company}</h3>
                <h4 className="result-location">{result.location}</h4>
              </div>
            ))
          : null}
      </div>
      {displayShowPage === true ? (
        <JobShowPage closeModal={closeModal} job={selectedJob} />
      ) : null}
    </div>
  );
};

export default Dashboard;
