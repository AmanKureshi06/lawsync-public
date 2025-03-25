import React from "react";
import "../Style/Success.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Success = () => {
  return (
    <>
    <Navbar/>
    <div className="success-page">
      <div className="content">
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="blue"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path
              d="M9 12l2 2 4-4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Successfully Done!</h2>
        <p>Your booking has been submitted successfully.</p>
        <button className="ok-button">OK</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Success;
