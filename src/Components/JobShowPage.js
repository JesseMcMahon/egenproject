import React from "react";
import "./JobShowPage.css";
import { AiOutlineClose } from "react-icons/ai";

const JobShowPage = (props) => {
  return (
    <div className="show-job-container">
      <div className="job-show">
        <div className="company-info">
          <img className="company-image" src={props.job.company_logo} />
          <div className="company-info-vertical-flex">
            <h4 className="company-name">{props.job.company}</h4>
            <h4 className="company-url">{props.job.company_url}</h4>
          </div>
          <a
            className="company-site-btn"
            target="_blank"
            rel="noreopener noreferrer"
            href={props.job.company_url}
          >
            Company Site
          </a>
          <AiOutlineClose className="close-icon" onClick={props.closeModal} />
        </div>
        <div className="job-details">
          <div className="details-apply-btn">
            <div className="quick-details">
              <p className="show-page-type">{props.job.type}</p>
              <h1 className="show-page-title">{props.job.title}</h1>
              <h3 className="show-page-location">{props.job.location}</h3>
            </div>
            <div className="apply-now-btn">
              <button>Apply Now</button>
            </div>
          </div>
          <h2 className="section-header">Description</h2>
          <p className="long-copy">{props.job.description}</p>
          <h2 className="section-header">Requirements</h2>
          <p className="long-copy">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </div>
        <div className="how-to-apply">
          <h3>How to Apply</h3>
          <p>{props.job.how_to_apply}</p>
        </div>
      </div>
    </div>
  );
};

export default JobShowPage;
