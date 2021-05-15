import React from "react";

const JobShowPage = (props) => {
  console.log(props);
  return (
    <div className="job-show">
      <h1>{props.job.company}</h1>
      <h3>Hello</h3>
    </div>
  );
};

export default JobShowPage;
