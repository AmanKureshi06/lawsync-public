import React, { useState } from "react";
import "../Style/ServiceProviderForm.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ServiceProviderForm = () => {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  const handleRemoveFile = (fileToRemove) => {
    setDocuments(documents.filter((file) => file !== fileToRemove));
  };

  return (
    <>
    <Navbar/>
    
    <div className="form-wrapper">
      <h2 className="lawyer-form-h2">Become a Service Provider</h2>
      <div className="progress-bar">
        <div className={`step ${step === 1 ? "active" : ""}`}>1</div>
        <div className={`line ${step >= 2 ? "active" : ""}`}></div>
        <div className={`step ${step === 2 ? "active" : ""}`}>2</div>
      </div>
      <div className="form-container">
        {step === 1 ? (
          <>
            <h3>Personal Info</h3>
            <form>
              <div className="form-group">
                <input className='lawyer-form-input' type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <input className='lawyer-form-input' type="text" placeholder="Mobile Number" />
              </div>
              <div className="form-group">
                <input className='lawyer-form-input' type="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <input className='lawyer-form-input' type="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <input className='lawyer-form-input' type="password" placeholder="Confirm Password" />
              </div>
              <button type="button" className="lawyer-register-btn btn" onClick={handleNext}>
                Continue
              </button>
            </form>
          </>
        ) : (
          <>
            <h3>Professional Info</h3>
            <form onSubmit={handleAddSkill}>
              <div className="form-group">
                <label>Rate (Per hour)</label>
                <input className='lawyer-form-input' type="number" placeholder="$" />
              </div>
              <div className="form-group">
                <label>About You</label>
                <textarea className="lawyer-form-input" placeholder="Write here"></textarea>
              </div>
              <div className="form-group">
                <label>Skills</label>
                <div className="skills-input">
                  <input className='lawyer-form-input'
                    type="text"
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                  />
                  <button type="button" onClick={handleAddSkill}>
                    Add
                  </button>
                </div>
                <div className="skills-container">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}{" "}
                      <button
                        type="button"
                        className="remove-skill"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Your Specialty</label>
                <select className="lawyer-form-input">
                  <option value="">Select</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="resolution">Resolution Experience</label>
                <textarea className="lawyer-form-input" id="resolution" placeholder="Write here"></textarea>
              </div>

              <div className="form-group">
                <label>Upload Certificate</label>
                <div className="upload-container">
                  <input
                    type="file"
                    className="lawyer-form-input file-input"
                    multiple
                    onChange={handleFileChange}
                  />
                  <div className="upload-content">
                    <p>Drag & Drop to upload document</p>
                    <span className="camera-icon">📷</span>
                  </div>
                </div>
                {/* <button
                  type="button"
                  className="add-more"
                  onClick={() => document.querySelector('.file-input').click()}
                >
                  + Add more Documents/Certificate
                </button> */}
              </div>

              <div className="skills-container">
                {documents.map((file, index) => (
                  <div key={index} className="file-item file-tag">
                    {file.name}
                    <button
                      type="button"
                      className="remove-file"
                      onClick={() => handleRemoveFile(file)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" className="lawyer-register-btn">
                Register
              </button>
            </form>
          </>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ServiceProviderForm;
