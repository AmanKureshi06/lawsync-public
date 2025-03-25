import React, { useState } from 'react';
import '../Style/LawyerRegister.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LawyerRegister = () => {
  document.title = 'Register Lawyer'

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '', // Add username here
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    rate: '',
    about: '',
    skills: [],
    specialty: '',
    experience: '',
    certificate: null,
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTermsAcceptance = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleProceed = () => {
    if (!termsAccepted) {
      toast.error("Accept the Terms to continue.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setStep(2); // Move to Personal Details step
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Regular expression to check for special characters
    const specialCharsRegex = /[^a-zA-Z0-9\s]/;

    // Only validate special characters for specific fields (excluding email and password)
    if (name !== 'email' && name !== 'password' && name !== 'confirmPassword' && specialCharsRegex.test(value)) {
      // Show error message if special characters are found
      e.target.classList.add('error-border');
      e.target.setAttribute('title', 'Special characters are not allowed.');
      toast.error('Special characters are not allowed.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    } else {
      e.target.classList.remove('error-border');
      e.target.removeAttribute('title'); // Remove error message if special characters are removed
    }

    // Update the form data if no special characters
    setFormData({ ...formData, [name]: value });
  };




  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput(""); // Clear input after adding
    } else {
      toast.error('Skill is either empty or already added.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill(e); // Call the function to add the skill when Enter is pressed
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };




  const handleFileChange = (e) => {
    setFormData({ ...formData, certificate: e.target.files[0] });
    const files = Array.from(e.target.files);
    setDocuments([...documents, ...files]);
  };

  const handleNext = () => {
    const { fullName, username, mobileNumber, email, password, confirmPassword } = formData;
    const inputs = [
      { name: 'fullName', value: fullName },
      { name: 'username', value: username },
      { name: 'mobileNumber', value: mobileNumber },
      { name: 'email', value: email },
      { name: 'password', value: password },
      { name: 'confirmPassword', value: confirmPassword },
    ];

    const firstEmptyInput = inputs.find(input => !input.value);

    if (firstEmptyInput) {
      const inputElement = document.querySelector(`[name="${firstEmptyInput.name}"]`);
      inputElement.classList.add('error-border');
      inputElement.setAttribute('title', 'This field is required.'); // Set popover message
      toast.error('Please fill in all the required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    const mobileNumberAlpha = formData.mobileNumber.trim();  // Get the trimmed mobile number input

    // Check if the mobile number contains alphabets or is not exactly 10 digits long
    if (!mobileRegex.test(mobileNumberAlpha)) {
      toast.error('Please enter a valid mobile number!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const emailInput = document.querySelector(`[name="email"]`);
      emailInput.classList.add('error-border');
      emailInput.setAttribute('title', 'Invalid email format.');
      toast.error('Please enter a valid email address.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    setStep(3);
  };


  const handleNextStepTwo = (e) => {
    e.preventDefault();
    const { rate, about, skills, specialty, experience } = formData;

    const inputs = [
      { name: 'rate', value: rate },
      { name: 'about', value: about },
      { name: 'skills', value: skills },
      { name: 'specialty', value: specialty },
      { name: 'experience', value: experience },
    ];

    const firstEmptyInput = inputs.find(input => !input.value);

    if (firstEmptyInput) {
      const inputElement = document.querySelector(`[name="${firstEmptyInput.name}"]`);
      if (inputElement) {
        inputElement.classList.add('error-border');
        inputElement.setAttribute('title', 'This field is required.');
      }
      toast.error('Please fill in all the required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    // Proceed to submit if all validations pass
    handleSubmit(e);
  };



  const handlePrevious = () => setStep(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error(`Passwords do not match`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    // Make sure the skills are stored as an array in the form data
    const updatedFormData = { ...formData, skills: JSON.stringify(skills) }; // Convert skills array to string for DB storage

    const formDataObj = new FormData();
    Object.keys(updatedFormData).forEach((key) => {
      if (key === 'certificate' && updatedFormData[key]) {
        formDataObj.append(key, updatedFormData[key]); // Append file if present
      } else {
        formDataObj.append(key, updatedFormData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/lawyer/register', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Lawyer Registered Successfully!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });

        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(`Error Registering Lawyer: ${data.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error(`An error occurred during registration.`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  const [documents, setDocuments] = useState([]);

  const handleRemoveFile = (fileToRemove) => {
    setDocuments(documents.filter((file) => file !== fileToRemove));
  };

  return (
    <>
      <Navbar />
      <div className="lawyer-container">
        {step === 1 && (
          <div className="form-step form-step-consent">
            <h2 className="form-heading">Terms and Conditions</h2>
            <div className="terms-content">
              <p className="terms-description">
                Please read and accept the following terms and conditions to proceed with the registration:
              </p>
              <ul className="terms-list">
                <li className='terms-li'>By registering, you agree to the Terms of Service.</li>
                <li className='terms-li'>All information provided is accurate and complete.</li>
                <li className='terms-li'>Consent to verification of credentials.</li>
                <li className='terms-li'>Agree to follow all applicable legal standards.</li>
                <li className='terms-li'>Ensure all provided details are accurate and true.</li>
                <li className='terms-li'>Keep login details secure and confidential.</li>
                <li className='terms-li'>Accept the platform’s Terms of Service.</li>
                <li className='terms-li'>Misrepresentation may lead to account suspension.</li>
                {/* <li className='terms-li'>Receive updates and notifications from the platform.</li> */}
                {/* <li className='terms-li'>Changes to terms may occur with prior notice.</li> */}
              </ul>
              <p className="terms-link">
                For more detailed information, please review our <a href="/terms" target="_blank" rel="noopener noreferrer"><i>Terms and Conditions</i></a>.
              </p>
              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms-checkbox"
                  checked={termsAccepted}
                  onChange={handleTermsAcceptance}
                  className="checkbox-input"
                />
                <label htmlFor="terms-checkbox" className="checkbox-label">
                  I accept the Terms and Conditions
                </label>
              </div>
              <button type="button" className="lawyer-btn lawyer-btn-consent" onClick={handleProceed}>
                Proceed
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2 className="form-h2">Personal Info</h2>
            <form>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Full Name</label> */}
                <input
                  className="lawyer-input username-capital"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  autoComplete="off"
                />
              </div>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Username</label> */}
                <div className="rate-container">
                  <div className="dollar-sign-box">@</div>
                  <input
                    className="lawyer-input rate-input username-small"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Mobile Number</label> */}
                <input
                  className="lawyer-input"
                  type="tel"
                  name="mobileNumber"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  autoComplete="off"
                />
              </div>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Email</label> */}
                <input
                  className="lawyer-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Password</label> */}
                <input
                  className="lawyer-input"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="lawyer-group">
                {/* <label className="lawyer-label">Confirm Password</label> */}
                <input
                  className="lawyer-input"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  autoComplete="off"
                  required
                />
              </div>
              <button type="button" className="lawyer-btn" onClick={handleNext}>
                Next
              </button>
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="form-step">
            <h6 className="pt-0 custom-font font-weight-500" style={{ color: 'black', cursor: 'pointer' }} onClick={handlePrevious}>
              <i className="fa-solid fa-arrow-left"></i> Back
            </h6>
            {/* <button type="button" className="lawyer-btn" onClick={handlePrevious}>
              Previous
            </button> */}
            <h2 className="form-h2">Professional Info</h2>
            <form onSubmit={handleSubmit}>
              <div className="lawyer-group">
                <label className="lawyer-label">Rate / Per Hour</label>
                <div className="rate-container">
                  <div className="dollar-sign-box">₹</div>
                  <input
                    className="lawyer-input rate-input"
                    type="text"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="lawyer-group">
                <label className="lawyer-label">About You</label>
                <textarea
                  className="lawyer-input"
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  required
                ></textarea>
              </div>
              <div className="lawyer-group">
                <label className="lawyer-label">Skills</label>
                <div className="skill-input-container">
                  <input
                    className="lawyer-input"
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g., Negotiation, Drafting"
                    onKeyDown={handleKeyDown} // Add event listener for the Enter key
                  />
                  <button type="button" className="add-skill-btn" onClick={handleAddSkill}>
                    Add Skill
                  </button>
                </div>
              </div>


              <div className="skills-container">
                {skills.map((skill, index) => (
                  <div key={index} className="file-item file-tag">
                    {skill}
                    <button
                      type="button"
                      className="remove-file"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>


              <div className="lawyer-group">
                <label className="lawyer-label">Your Specialty</label>
                <select
                  className="lawyer-input"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="family">Family Law</option>
                  <option value="criminal">Criminal Law</option>
                  <option value="corporate">Corporate Law</option>
                </select>
              </div>
              <div className="lawyer-group">
                <label className="lawyer-label">Resolution Experience</label>
                <textarea
                  className="lawyer-input"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Write here"
                  required
                ></textarea>
              </div>
              <div className="lawyer-group">
                <label className="lawyer-label">Upload Certificate</label>
                <div className="upload-container">
                  <input
                    className="lawyer-input file-input"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <div className="upload-content">
                    <p>Drag & Drop to upload document</p>
                    <span className="camera-icon">📷</span>
                  </div>
                </div>
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
              <button type="submit" className="lawyer-btn" onClick={handleNextStepTwo}>
                Register
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default LawyerRegister;
