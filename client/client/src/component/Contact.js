import React, { useState } from "react";
import { Facebook, Twitter, Instagram, Youtube } from "react-bootstrap-icons";
import "./contact.css";

const ContactPage = () => {
  const [text, setText] = useState("");
  const [reportType, setReportType] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="social-links">
        <a href="https://www.facebook.com">
          <Facebook className="social-icon" />
        </a>
        <a href="https://www.twitter.com">
          <Twitter className="social-icon" />
        </a>
        <a href="https://www.instagram.com">
          <Instagram className="social-icon" />
        </a>
        <a href="https://www.youtube.com">
          <Youtube className="social-icon" />
        </a>
      </div>
      <div className="background-picture">
        <div className="labels">
         
          <label className="report">  
  <div>
    <input
      type="radio"
      value="site"
      checked={reportType === "site"}
      onChange={handleReportTypeChange}
    />
    <span className={`icon-radio-1 ${reportType === "site" ? "checked" : ""}`}>
      {/* {reportType === "site" && <span className="tick">&#x2714;</span>} */}
      Report the site
    </span>
  </div>
  <div>
    <input
      type="radio"
      value="service"
      checked={reportType === "service"}
      onChange={handleReportTypeChange}
    />
    <span className={`icon-radio-2 ${reportType === "service" ? "checked" : ""}`}>
      {/* {reportType === "service" && <span className="tick">&#x2714;</span>} */}
      Report a service
    </span>
  </div>
</label>

<label className="putput">
            <input id="input1" type="text" value={text} onChange={handleTextChange} placeholder=" Send a Text" />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            <input id="input2" type="email" value={email} onChange={handleEmailChange} placeholder="Type your Email" />
          </label>
          <button className="sub-contact" type="submit">
            Submit 
          </button>
        </form>
        {isSubmitted && (
          <div className="confirmation">
            Thank you! Your submission has been received. We will contact you at {email}.
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
