import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Button, Image, Card, Modal, Form, Dropdown } from "react-bootstrap";
import { EllipsisVertical, Lock } from "lucide-react";
import UserSidebar from "./UserSidebar";
import "../Style/UserPayment.css";
import withAuthProtection from "../utils/withAuthProtection";
import withRoleProtection from "../utils/withRoleProtection";
import axios from "axios";
import { toast } from "react-toastify";
import withAutoLogout from "../utils/withAutoLogout";

const UserPayment = () => {
  document.title = "Payment Options";
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [currentCard, setCurrentCard] = useState(null);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [action, setAction] = useState(null);

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/cards/getUserCards",
          { email: userEmail }
        );

        if (response.data.cards && response.data.cards.length > 0) {
          setCards(response.data.cards);
          setError(""); // Clear any existing error
        } else {
          setCards([]); // Ensure the cards state is cleared
          setError("Add the card"); // Set the specific error message
        }
      } catch (error) {
        setError("Failed to fetch card details.");
        console.error("Failed to fetch cards:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchCards();
    }
  }, [userEmail]);

  const handleShowModal = (card, actionType) => {
    setCurrentCard(card);
    setAction(actionType);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPassword("");
    setShowCardDetails(false);
  };

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/validate-password",
        { email: userEmail, password }
      );

      if (response.data.success) {
        if (action === "viewExpiry") {
          setShowCardDetails(true);
        } else if (action === "deleteCard") {
          // API call to delete the card
          await axios.post("http://localhost:5000/api/cards/delete", {
            id: currentCard._id, // Use _id for MongoDB
          });

          // Update the card list in the state
          setCards(cards.filter((card) => card._id !== currentCard._id));
          toast.success("Card deleted successfully.");
        }
        setShowModal(false);
        setShowModal(false);
      } else {
        alert(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error validating password:", error);
      toast.error("Incorrect password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex">
        <UserSidebar />
        <div
          className="content"
          style={{ flex: 1, padding: "20px", fontFamily: "Arial, sans-serif" }}
        >
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Payment Options</h2>
              <Button
                className="button-add"
                variant="outline-primary"
                onClick={() => {
                  window.location.href = "addcard";
                }}
              >
                + Add Card
              </Button>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : cards.length > 0 ? (
              <div className="d-flex flex-wrap gap-3">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    style={{
                      width: "100%",
                      maxWidth: "25rem",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                    }}
                  >
                    <Card.Body className="d-flex align-items-center justify-content-between">
                      <div>
                        <Image
                          src={
                            card.cardType === "Visa"
                              ? "https://via.placeholder.com/40x25"
                              : "https://via.placeholder.com/40x25"
                          }
                          alt={card.cardType}
                        />
                        <span className="ms-2">
                          XXXX XXXX XXXX {card.cardNumber.slice(-4)}
                        </span>
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          as="div"
                          style={{ cursor: "pointer" }}
                          className="custom-dropdown-toggle"
                        >
                          <EllipsisVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => handleShowModal(card, "viewExpiry")}
                          >
                            View Expiry Date
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleShowModal(card, "deleteCard")}
                          >
                            Delete Card
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Body>
                    <Card.Footer>
                      {showCardDetails &&
                        currentCard &&
                        currentCard.id === card.id && (
                          <>
                            <div>
                              <strong>Expiry Date:</strong> {card.expiryDate}
                            </div>
                          </>
                        )}
                    </Card.Footer>
                  </Card>
                ))}
              </div>
            ) : (
              <div>No cards found.</div>
            )}
          </div>
          {/* Safe Environment Message */}
          <div className="safe-environment-message">
            <Lock className="icon" size={"20px"} />
            Your card details are securely stored.
          </div>
        </div>
      </div>

      <Footer />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default withAutoLogout(
  withAuthProtection(withRoleProtection(UserPayment, ["user"]))
);
