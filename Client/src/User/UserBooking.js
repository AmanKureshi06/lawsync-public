import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import UserSidebar from "./UserSidebar";
import Footer from "../Components/Footer";
import { MessageCircle } from "lucide-react";
import "../Style/UserBooking.css";
import withRoleProtection from "../utils/withRoleProtection";
import withAuthProtection from "../utils/withAuthProtection";
import withAutoLogout from "../utils/withAutoLogout";



const UserBooking = ({ onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hover, setHover] = useState(null);

    const handlePopupSubmit = (data) => {
        console.log("Rating submitted:", data);
        // Add logic to send data to the backend or update state
    };

    const advocate = {
        name: "Jacob Jones",
        image: "https://via.placeholder.com/100", // Replace with actual advocate image URL
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, review });
        onClose();
    };

    const handleStarHover = (index) => {
        setHover(index + 1); // Set hover (index is 0-based)
    };

    const handleStarHoverOut = () => {
        setHover(null); // Reset hover
    };


    const [showPopup, setShowPopup] = useState(false);


    const togglePopup = () => {
        console.log("Toggling Change Password popup");
        setShowPopup(!showPopup);
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("Form submitted");
    // };



    const [activeTab, setActiveTab] = useState("upcoming");

    const upcomingBookings = [
        {
            name: "Jenny Wilson",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            message: "Meeting Start in 5:30 Mins",
            button: "Start Now",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Jacob Jones",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            button: "Start Call",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Jacob Jones",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            button: "Start Call",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Jacob Jones",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            button: "Start Call",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Jacob Jones",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            button: "Start Call",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Jacob Jones",
            reviews: 233,
            price: 200,
            date: "5 Jan 2023",
            time: "2:00 pm to 3:00 pm",
            status: "Upcoming",
            button: "Start Call",
            image: "https://via.placeholder.com/100",
        },
    ];

    const completedBookings = [
        {
            name: "Dianne Russell",
            rating: 0.0,
            reviews: 233,
            price: 200,
            date: "3 Jan 2023",
            time: "1:00 pm to 2:00 pm",
            status: "Completed",
            button: "Rate this Advocate",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Marvin McKinney",
            rating: 4.0,
            reviews: 233,
            price: 200,
            date: "2 Jan 2023",
            time: "11:00 am to 12:00 pm",
            status: "Completed",
            button: "Rated",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Dianne Russell",
            rating: 3.0,
            reviews: 233,
            price: 200,
            date: "3 Jan 2023",
            time: "1:00 pm to 2:00 pm",
            status: "Completed",
            button: "Rated",
            image: "https://via.placeholder.com/100",
        },
        {
            name: "Marvin McKinney",
            rating: 2.0,
            reviews: 233,
            price: 200,
            date: "2 Jan 2023",
            time: "11:00 am to 12:00 pm",
            status: "Completed",
            button: "Rated",
            image: "https://via.placeholder.com/100",
        },
    ];

    // Dynamically select bookings based on active tab
    const bookings = activeTab === "upcoming" ? upcomingBookings : completedBookings;

    return (
        <>
            <Navbar />
            <div className="user-booking-layout">
                <UserSidebar />
                <div className="my-bookings-container">
                    <h1 className="title">My Bookings</h1>
                    <div className="tabs">
                        <button
                            className={activeTab === "upcoming" ? "active" : ""}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            Upcoming
                        </button>
                        <button
                            className={activeTab === "completed" ? "active" : ""}
                            onClick={() => setActiveTab("completed")}
                        >
                            Completed
                        </button>
                    </div>

                    <div className="bookings-grid">
                        {bookings.map((booking, index) => (
                            <div key={index} className="booking-card">
                                <div className="booking-header">
                                    <img src={booking.image} alt={booking.name} className="profile-pic" />
                                    <div>
                                        <div className="booking-header-text">
                                            <h3>{booking.name}</h3>
                                            <MessageCircle />
                                        </div>
                                        <div className="reviews">
                                            <span>⭐ {booking.reviews} Reviews</span>
                                        </div>
                                        <p className="price">${booking.price} / per hour</p>
                                    </div>
                                </div>
                                <div className="booking-details">
                                    <p>
                                        <strong>Date:</strong> {booking.date}
                                    </p>
                                    <p>
                                        <strong>Time:</strong> {booking.time}
                                    </p>
                                    {activeTab === "completed" && (
                                        <p>
                                            <strong>Rated:</strong> ⭐ {booking.rating}
                                        </p>
                                    )}
                                </div>
                                <div className="booking-actions">
                                    {activeTab === "completed" && <span className="status completed">{booking.status}</span>}
                                    {booking.button === "Rate this Advocate" ? (
                                        <button className="action-button" onClick={togglePopup}>
                                            {booking.button}
                                        </button>
                                    ) : (
                                        <button className="action-button" disabled>
                                            {booking.button}
                                        </button>
                                    )}
                                    {booking.message && <p className="message text-center">{booking.message}</p>}
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
                {showPopup && (
                    <div className="popup rate-popup" aria-hidden={!showPopup} aria-modal={showPopup}>
                        <div className="aria-modal modal-rate">
                            <button className="close-button close-rate" onClick={onClose = () => setShowPopup(false)}>
                                &times;
                            </button>
                            <h2>Rate this Advocate</h2>
                            <img src={advocate.image} alt={advocate.name} className="advocate-image" />
                            <h3>{advocate.name}</h3>
                            <div className="star-rating">
                                {[...Array(5)].map((_, index) => (
                                    <span
                                        key={index}
                                        className={
                                            index < (hover || rating) ? 'star filled' : 'star'
                                        }
                                        onClick={() => handleStarClick(index)}
                                        onMouseEnter={() => handleStarHover(index)}
                                        onMouseLeave={handleStarHoverOut}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                            <form onSubmit={handlePopupSubmit}>
                                <textarea
                                    placeholder="Write here"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    className="review-input"
                                    rows="4"
                                    required
                                ></textarea>
                                <button type="submit" className="submit-button rate-button">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default withAutoLogout(withAuthProtection(withRoleProtection(UserBooking,["user"])));