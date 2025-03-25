import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Style/MyWallet.css";
import { Button, ListGroup, Image, Card } from "react-bootstrap";
import { EllipsisVertical } from "lucide-react";
import withAutoLogout from "../utils/withAutoLogout";
import withAuthProtection from "../utils/withAuthProtection";
import withRoleProtection from "../utils/withRoleProtection";
import LawyerSidebar from "./LawyerSidebar";

const Mywallet = () => {
    return (
        <>
            <Navbar />
            {/* <div className="my-wallet-page"> */}
            <div className="container-fluid d-flex">
                <LawyerSidebar />


                {/* Content Section */}

                <div className="content my-wallet-page" style={{ flex: 1, padding: "20px", fontFamily: "Arial, sans-serif" }}>
                    <h2>My Wallet</h2>
                    {/* Total Balance Section */}
                    <Card className="mb-4" style={{ backgroundColor: "rgb(9, 25, 60)", color: "#fff", borderRadius: "10px" }}>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3>$2000</h3>
                                <p>Total Balance</p>
                            </div>
                            <Button variant="primary" style={{ backgroundColor: "#007bff", border: "none" }}>
                                Transfer to Bank Account
                            </Button>
                        </Card.Body>
                    </Card>

                    {/* My Bank Accounts Section */}
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3" >
                            <h2>Payment Options</h2>
                            <Button className='button-add' variant="outline-primary" onClick={() => { window.location.href = "/profile/addcard"; }}>
                                + Add Card
                            </Button>
                        </div>
                        <div className="d-flex flex-wrap gap-3">
                            <Card style={{ width: "100%", maxWidth: "25rem", border: "1px solid #ddd", borderRadius: "10px" }}>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <Image src="https://via.placeholder.com/40x25" alt="Visa" />
                                        <span className="ms-2">XXXX XXXX XXXX 3243</span>
                                    </div>
                                    <div>
                                        <span style={{ color: "green" }}>✔</span>
                                        <EllipsisVertical />
                                    </div>
                                </Card.Body>
                            </Card>
                            <Card style={{ width: "100%", maxWidth: "25rem", border: "1px solid #ddd", borderRadius: "10px" }}>
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <Image src="https://via.placeholder.com/40x25" alt="MasterCard" />
                                        <span className="ms-2">XXXX XXXX XXXX 3243</span>
                                    </div>
                                    <div>
                                        <span style={{ color: "green" }}>✔</span>
                                        <EllipsisVertical />
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>

                    {/* Income History Section */}
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Income History</h5>
                            <i className="bi bi-search"></i>
                        </div>
                        <ListGroup>
                            {[
                                { name: "Albert Flores", date: "21 Jan 2023", amount: "$199" },
                                { name: "Guy Hawkins", date: "21 Jan 2023", amount: "$199" },
                                { name: "Theresa Webb", date: "21 Jan 2023", amount: "$199" },
                                { name: "Darrell Steward", date: "21 Jan 2023", amount: "$199" },
                                { name: "Eleanor Pena", date: "21 Jan 2023", amount: "$199" },
                                { name: "Courtney Henry", date: "21 Jan 2023", amount: "$199" },
                            ].map((item, index) => (
                                <ListGroup.Item
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                    style={{ borderBottom: "1px solid #ddd" }}
                                >
                                    <div className="d-flex align-items-center">
                                        <Image
                                            src="https://via.placeholder.com/40"
                                            roundedCircle
                                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                                        />
                                        <div>
                                            <p style={{ margin: 0 }}>{item.name}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p style={{ margin: 0, marginRight: "20px" }}>{item.date}</p>
                                        <strong>{item.amount}</strong>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
            </div>
            {/* </div> */}
            <Footer />
        </>
    );
};


export default withAutoLogout(withAuthProtection(withRoleProtection(Mywallet, ["lawyer"])));