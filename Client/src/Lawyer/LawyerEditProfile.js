import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Style/LawyerEditProfile.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import withRoleProtection from "../utils/withRoleProtection";
import withAuthProtection from "../utils/withAuthProtection";
import withAutoLogout from "../utils/withAutoLogout";
import { toast } from "react-toastify";
import axios from "axios";
import LawyerSidebar from "./LawyerSidebar";
import React, { useEffect, useState } from "react";

const EditProfile = () => {
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
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
  document.title = 'Edit Profile';
  const navigate = useNavigate();

  const [initialFormData, setInitialFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const [initialProfessionalData, setInitialProfessionalData] = useState({
    rate: "",
    skills: "",
    specialty: "",
    about: "",
    experience: "",
  });

  const [professionalData, setProfessionalData] = useState({
    rate: "",
    skills: "",
    specialty: "",
    about: "",
    experience: "",
  });

  const [isProUpdated, setIsProUpdated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/profile', {
          email: userEmail,
        }, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });

        const { fullName, mobileNumber, email } = response.data;
        setFormData({ fullName, mobileNumber, email });
        setInitialFormData({ fullName, mobileNumber, email });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data.');
      }
    };

    const fetchProfessionalData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/lawyer/profile', {
          email: userEmail,
        });
        const fetchedProfessionalData = {
          rate: response.data.rate || "",
          skills: response.data.skills?.join(", ") || "",
          specialty: response.data.specialty || "",
          about: response.data.about || "",
          experience: response.data.experience || "",
        };

        setProfessionalData(fetchedProfessionalData);
        setInitialProfessionalData(fetchedProfessionalData);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch professional data.', { position: 'top-right' });
      }
    };

    fetchUserData();
    fetchProfessionalData();
  }, [navigate]);

  useEffect(() => {
    const hasChanges = Object.keys(formData).some((key) => formData[key] !== initialFormData[key]);
    setIsUpdated(hasChanges);
  }, [formData, initialFormData]);

  useEffect(() => {
    const hasChanges = Object.keys(professionalData).some(
      (key) => professionalData[key] !== initialProfessionalData[key]
    );
    setIsProUpdated(hasChanges);
  }, [professionalData, initialProfessionalData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfessionalChange = (e) => {
    setProfessionalData({ ...professionalData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/user/profile", formData);
      toast.success("Profile updated successfully!", { position: 'top-right' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to update profile.', { position: 'top-right' });
    }
  };

  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem('userEmail');
      await axios.put("http://localhost:5000/api/lawyer/profile", {
        email: userEmail,
        ...professionalData,
      });
      toast.success('Professional info updated successfully!', { position: 'top-right' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to update professional info.', { position: 'top-right' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <LawyerSidebar />
        <div className="content">
          <h1 className="edit-profile-h1">Edit Profile</h1>
          <div className="personal-info mb-5">
            {/* Personal Info Form */}
            <Form onSubmit={handleSubmit}>
              <Row className="align-items-start mb-0">
                <Col md={3} className="text-center input-col">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="Profile"
                    className="profile-image"
                    style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                  />
                </Col>
                <Col md={3} className="input-col">
                  <Form.Group controlId="formFullName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="input-col">
                  <Form.Group controlId="formMobileNumber">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="mobileNumber"
                      placeholder="Mobile Number"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      maxLength="10"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* ClassName="email-padding" */}
              <Row className="mb-4 align-items-center">
                <Col md={{ span: 3, offset: 3 }}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
              {error && <p className="text-danger">{error}</p>}
              {success && <p className="text-success">{success}</p>}
              <Row>
                <Col md={{ span: 3, offset: 3 }}>
                  <Button variant="primary" className="save-button" type="submit" disabled={!isUpdated}>
                    Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
          {/* Professional Info Section */}
          <div className="professional-inf">
            <h2>Professional Info</h2>
            <Form onSubmit={handleProfessionalSubmit}>
              <Form.Group>
                <Form.Label>Rate (Per hour)</Form.Label>
                <Form.Control
                  type="number"
                  name="rate"
                  value={professionalData.rate}
                  onChange={handleProfessionalChange}
                  placeholder="$"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Skills</Form.Label>
                <Form.Control
                  type="text"
                  name="skills"
                  value={professionalData.skills}
                  onChange={handleProfessionalChange}
                  placeholder="Add skills (comma-separated)"
                />
              </Form.Group>
              {/* <div className="lawyer-group">
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
              </div> */}
              <Form.Group>
                <Form.Label>Your Specialty</Form.Label>
                <Form.Control
                  as="select"
                  name="specialty"
                  value={professionalData.specialty}
                  onChange={handleProfessionalChange}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Family Law">Family Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Criminal Law">Criminal Law</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>About You</Form.Label>
                <Form.Control
                  as="textarea"
                  name="about"
                  value={professionalData.about}
                  onChange={handleProfessionalChange}
                  placeholder="Write here"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Resolution Experience</Form.Label>
                <Form.Control
                  as="textarea"
                  name="experience"
                  value={professionalData.experience}
                  onChange={handleProfessionalChange}
                  placeholder="Write here"
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!isProUpdated}>
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAutoLogout(withAuthProtection(withRoleProtection(EditProfile, ["lawyer"])));
