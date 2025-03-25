import React, { useState, useEffect } from "react";
import "../Style/Popup.css";
import "../Style/Calender.css";
import "../Style/UserSidebar.css";
import {
  Clock,
  Lock,
  MessageCircle,
  Newspaper,
  Pencil,
  Settings,
  Wallet,
  ChevronRight,
  ChevronLeft,
  EyeClosed,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

const UserSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [fullName, setFullName] = useState("Loading..."); // State for fullName
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setError("");
    setSuccess("");
  };

  // const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem("userEmail"); // Replace with actual user email from context/state
    const currentPassword = event.target.currentPassword.value;
    const newPassword = event.target.newPassword.value;
    const confirmNewPassword = event.target.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword) {
      // alert('New password and confirmation do not match!');
      toast.error("New password and confirmation do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      return;
    }

    const payload = {
      email,
      currentPassword,
      newPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/user/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Password Successfully Changed! Please log in again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });

        // Clear local storage and log the user out
        localStorage.removeItem("token"); // Remove stored JWT token if applicable
        localStorage.removeItem("userEmail");

        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login"; // Adjust based on your routing
        }, 3000);
      } else {
        // alert(data.message || 'Error updating password');
        toast.error(data?.message || "Error Updating Password!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again later.");
      toast.error(error?.message || "Server error! Please try again later.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  // Fetch fullName using POST method
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const email = localStorage.getItem("userEmail"); // Assuming email is stored in localStorage
        if (!email) {
          setFullName("User not logged in");
          return;
        }

        const response = await fetch("http://localhost:5000/api/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Sending email in the request body
        });

        const data = await response.json();

        if (response.ok) {
          setFullName(data.fullName); // Extracting fullName from the response
        } else {
          setFullName("Error fetching user details");
          console.error(
            "Error fetching user details:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        setFullName("Error fetching user details");
        console.error("Server error:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const [isClosing, setIsClosing] = useState(false); // Track the closing state

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      // Start the closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsSidebarOpen(false);
        setIsClosing(false); // Reset closing state
      }, 300); // Match the CSS transition duration
    } else {
      setIsSidebarOpen(true);
    }
  };

  const closeSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="app-container">
      {/* Burger Menu */}
      <div className="burger-menu">
        <button className="burger-icon" onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <ChevronLeft size={24} color="#000" />
          ) : (
            <ChevronRight size={24} className="closing-icon" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`usersidebar ${isSidebarOpen ? "open" : ""} ${
          isClosing ? "closing" : ""
        }`}
      >
        <div className="profile-info">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="profile-image"
          />
          <h2>{fullName}</h2>
        </div>
        <ul className="menu">
          <a
            href="/usereditprofile"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Pencil color="#2278c9" size={20} />
              Edit Profile
            </li>
          </a>
          <a
            href="/userpayment"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Wallet color="#2278c9" />
              Payment Options
            </li>
          </a>
          <a
            href="/userbooking"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Clock color="#2278c9" />
              My Bookings
            </li>
          </a>
          <a href="/" style={{ textDecoration: "none", color: "black" }}>
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Newspaper color="#2278c9" />
              My Posts
            </li>
          </a>
          <a
            href="/usermessage"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <MessageCircle color="#2278c9" />
              Messages <span className="notification">2</span>
            </li>
          </a>
          <li
            onClick={togglePopup}
            className="d-flex align-items-center gap-2 border-bottom"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Lock color="#2278c9" />
            Change Password
          </li>
          <a
            href="/usersettings"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Settings color="#2278c9" />
              Settings
            </li>
          </a>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}

      {showPopup && (
        <div className="popup" aria-hidden={!showPopup} aria-modal={showPopup}>
          <div className="aria-modal">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>
            <h2 className="modal-title mb-2">Change Password</h2>
            <form className="password-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    placeholder="Current Password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPasswords.currentPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </label>
              </div>
              <div className="input-group">
                <label>
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="New Password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPasswords.newPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </label>
              </div>
              <div className="input-group">
                <label>
                  <input
                    type={
                      showPasswords.confirmNewPassword ? "text" : "password"
                    }
                    name="confirmNewPassword"
                    placeholder="Confirm New Password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("confirmNewPassword")
                    }
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPasswords.confirmNewPassword ? <Eye /> : <EyeClosed />}
                  </button>
                </label>
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSidebar;
