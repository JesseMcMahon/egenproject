import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { AiTwotoneFilter } from "react-icons/ai";
import JobShowPage from "./JobShowPage";
import "../style.css";
import axios from "axios";
import { Switch, Route, Router, Link, useRouteMatch } from "react-router-dom";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayShowPage, setDisplayShowPage] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fullTimeSelected, setFullTimeSelected] = useState(false);
  const smallScreenLocationSearch = document.getElementById(
    "small-screen-location-search"
  );

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
        `https://thingproxy.freeboard.io/fetch/https://jobs.github.com/positions.json?description=${searchTerm}&${fullTimeSelected}&location=${searchLocation}`
      )
      .then((res) => setSearchResults(res.data));
  };

  let { path, url } = useRouteMatch();

  const showJob = (job) => {
    setSelectedJob(job);
    setDisplayShowPage(true);
    console.log(job);
  };

  return (
    <>
      <div className="dashboard-container">
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
                  {/* <Link to={`${url}/jobs/${result.id}`}> */}
                  <h2 className="result-title">{result.title}</h2>
                  {/* </Link> */}
                  <h3 className="result-company">{result.company}</h3>
                  <h4 className="result-location">{result.location}</h4>
                </div>
              ))
            : null}
        </div>
        {showJob ? <JobShowPage job={selectedJob} /> : null}
      </div>

      {/* <Switch>
        {searchResults.map((result) => (
          <Route exact path={`${path}/jobs/${result.id}`}>
            <JobShowPage className="job-show-test" props={result} />
          </Route>
        ))}
      </Switch> */}
    </>
  );
};

export default Dashboard;
