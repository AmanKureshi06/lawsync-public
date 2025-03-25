import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Style/AdminEditProfile.css";
import { Row, Col, Button, Form } from "react-bootstrap";
import withAuthProtection from '../utils/withAuthProtection'; // Import the HOC
import withRoleProtection from "../utils/withRoleProtection";
import { toast } from "react-toastify";
import AdminSidebar from "./AdminSidebar";
import withAutoLogout from "../utils/withAutoLogout";

const EditAdminProfile = () => {
  document.title='Edit Profile';
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/login');  // If no user is logged in, redirect to login
      return; // Exit early if not logged in
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/user/profile', {
          email: userEmail, // Send email directly in the request body
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

    fetchUserData();
  }, [navigate]); // Runs once when component mounts

  useEffect(() => {
    const hasChanges = Object.keys(formData).some((key) => formData[key] !== initialFormData[key]);
    setIsUpdated(hasChanges);
  }, [formData, initialFormData]);

  useEffect(() => {
    const successMessage = localStorage.getItem("profileUpdateSuccess");
    if (successMessage) {
      toast.success(successMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      localStorage.removeItem("profileUpdateSuccess"); // Remove the flag after showing the toast
    }
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.fullName || !formData.mobileNumber || !formData.email) {
      toast.error('All fields must be filled!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }
    if (formData.mobileNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      toast.error('Name should contain only alphabets and spaces.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }


    try {
      await axios.put("http://localhost:5000/api/user/profile", formData);

      localStorage.setItem("profileUpdateSuccess", "Profile updated successfully!");
      window.location.reload(); // Reload the page

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update profile.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <AdminSidebar/>
        <div className="content">
          <h1 className="edit-profile-h1">Edit Profile</h1>
          <div className="personal-info mb-5">
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
              <Row className="mb-4 align-items-center ">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAutoLogout(withAuthProtection(withRoleProtection(EditAdminProfile, ["admin"])));
