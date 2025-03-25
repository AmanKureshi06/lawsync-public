import React, { useEffect, useState } from "react";
import "../Style/MainPopup.css";
import "../Style/Calender.css";
import "../Style/LawyerSidebar.css";
import {
  Clock,
  Lock,
  MessageCircle,
  Newspaper,
  Pencil,
  Settings,
  Wallet,
  Menu,
  X,
  CreditCard,
} from "lucide-react";
import { Calendar } from "primereact/calendar";

const LawyerSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [wholeMonthUnavailable, setWholeMonthUnavailable] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("8:00 AM");
  const [endTime, setEndTime] = useState("9:00 AM");
  const [isClosing, setIsClosing] = useState(false); // Track the closing state
  const [fullName, setFullName] = useState("Loading..."); // State for fullName

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

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const toggleWholeMonthUnavailable = () => {
    setWholeMonthUnavailable(!wholeMonthUnavailable);
  };

  const handleTimeChange = (e, type) => {
    if (type === "start") {
      setStartTime(e.target.value);
    } else {
      setEndTime(e.target.value);
    }
  };

  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  const togglePopup = () => {
    console.log("Toggling Change Password popup");
    setShowPopup(!showPopup);
  };

  const togglePopup2 = () => {
    console.log("Toggling Set Availability popup");
    setShowPopup2(!showPopup2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

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

  const [date, setDate] = useState(null);

  return (
    <div className="app-container">
      <div className="burger-menu">
        <button className="burger-icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} color="#000" /> : <Menu size={24} />}
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
          {/* <Link to={'/profile'} className="text-black"> */}
          <a href="/profile" style={{ textDecoration: "none", color: "black" }}>
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Pencil color="#2278c9" size={20} />
              Edit Profile
            </li>
          </a>
          {/* </Link> */}
          <a
            href="/profile/wallet"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <Wallet color="#2278c9" />
              My Wallet
            </li>
          </a>
          <a
            href="/profile/payments"
            style={{ textDecoration: "none", color: "black" }}
          >
            <li className="d-flex align-items-center gap-2 border-bottom">
              <CreditCard color="#2278c9" />
              Payment Options
            </li>
          </a>
          {/* <li
            onClick={togglePopup2}
            style={{ textDecoration: "none", color: "black" }}
            className="d-flex align-items-center gap-2 border-bottom"
          >
            <Clock color="#2278c9" />
            Set Availability
          </li> */}
          <a href="/user/chat" style={{ textDecoration: "none", color: "black" }}>
            <li className="d-flex align-items-center gap-2 border-bottom">
              <MessageCircle color="#2278c9" />
              Messages <span className="notification">2</span>
            </li>
          </a>
          <li
            onClick={togglePopup}
            style={{ textDecoration: "none", color: "black" }}
            className="d-flex align-items-center gap-2 border-bottom"
          >
            <Lock color="#2278c9" />
            Change Password
          </li>
          <a
            href="/settings"
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
            <h2 className="modal-title">Change Password</h2>
            <form className="password-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label>
                  <input type="password" placeholder="Current Password" />
                </label>
              </div>
              <div className="input-group">
                <label>
                  <input type="password" placeholder="New Password" />
                </label>
              </div>
              <div className="input-group">
                <label>
                  <input type="password" placeholder="Confirm New Password" />
                </label>
              </div>
              <button type="submit" className="submit-button">
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      {showPopup2 && (
        <div
          className="popup2"
          aria-hidden={!showPopup2}
          aria-modal={showPopup2}
        >
          <div className="aria-modal2">
            <button className="close-button" onClick={togglePopup2}>
              &times;
            </button>
            <div className="calendar-container">
              <h2 className="text-center mt-2">Set Availability</h2>
              <div className="card flex justify-content-center text-left mobile-calendar custom-float-label">
                <Calendar
                  inputId="birth_date"
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  showButtonBar
                  dateFormat="dd-mm-yy"
                  className="calendar-small"
                  placeholder="Select Date"
                />
              </div>
              <Calendar
                variant="filled"
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                showButtonBar
                className="calender calendar-large"
              />

              <div className="availability-options">
                <label className="toggle-container">
                  <span>Whole Month Unavailable</span>
                  <input
                    type="checkbox"
                    checked={wholeMonthUnavailable}
                    onChange={toggleWholeMonthUnavailable}
                  />
                  <span className="toggle-switch"></span>
                </label>
                {!wholeMonthUnavailable && (
                  <div className="time-selection">
                    {/* <label className="time-selection-label">Select Time</label> */}
                    <div className="time-inputs">
                      <select
                        value={startTime}
                        onChange={(e) => handleTimeChange(e, "start")}
                        className="time-select"
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <span className="time-to">to</span>
                      <select
                        value={endTime}
                        onChange={(e) => handleTimeChange(e, "end")}
                        className="time-select"
                      >
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className="action-buttons">
                <button className="available-button">Available</button>
                <button className="unavailable-button">Unavailable</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const timeOptions = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

export default LawyerSidebar;
