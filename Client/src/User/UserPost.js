import React from "react";
import "../Style/UserPost.css";
import Navbar from "../Components/Navbar";
import UserSidebar from "./UserSidebar";
import Footer from "../Components/Footer";

const UserPost = () => {
    const posts = [
        {
            title: "I need someone to view my legal work like Misleading advertising and Contract disputes.",
            hourlyRate: "$40 - $50",
            postedTime: "4 hours ago",
            hoursNeeded: "Less than 30 hrs/week",
            duration: "2 Weeks",
            experienceIn: "Contract disputes",
            location: "Dallas, TX",
            description: "We need someone with larger scale legal...",
            paymentVerified: true,
        },
        {
            title: "I need someone to view my legal work like Misleading advertising and Contract disputes.",
            hourlyRate: "$40 - $50",
            postedTime: "4 hours ago",
            hoursNeeded: "Less than 30 hrs/week",
            duration: "2 Weeks",
            experienceIn: "Contract disputes",
            location: "Dallas, TX",
            description: "We need someone with larger scale legal...",
            paymentVerified: true,
        },
    ];

    return (
        <>
            <Navbar />
            <div className="user-post-layout">
                <UserSidebar />
                <div className="my-posts-container" style={{ margin: '0' }}>
                    <h1>My Posts</h1>
                    <div className="posts-grid">
                        {posts.map((post, index) => (
                            <div key={index} className="post-card">
                                <h2>{post.title}</h2>
                                <p>
                                    <strong>Hourly:</strong> {post.hourlyRate} <span>• {post.postedTime}</span>
                                </p>
                                <p>
                                    <strong>Hours needed:</strong> {post.hoursNeeded}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {post.duration}
                                </p>
                                <p>
                                    <strong>Experience In:</strong> {post.experienceIn}
                                </p>
                                <p>
                                    <strong>Location:</strong> {post.location}
                                </p>
                                <p>{post.description}</p>
                                <div className="actions">
                                    {post.paymentVerified && <span className="verified">✔ Payment Verified</span>}
                                    <button className="edit-btn">✏️</button>
                                    <button className="delete-btn">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UserPost;
