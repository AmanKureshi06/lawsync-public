import React, { useState } from 'react';
import '../Style/AddCard.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import withAuthProtection from '../utils/withAuthProtection';
import withRoleProtection from '../utils/withRoleProtection';
import withAutoLogout from '../utils/withAutoLogout';
import { useNavigate } from 'react-router-dom';

const AddCard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
    });

    const userEmail = localStorage.getItem('userEmail');

    // Function to handle changes in the form
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Format card number with spaces
        if (name === 'cardNumber') {
            const formattedValue = value.replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ').trim();
            setFormData({ ...formData, [name]: formattedValue });
        }
        // Format expiry date as MM / YY
        else if (name === 'expiryDate') {
            let formattedValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            if (formattedValue.length >= 2) {
                formattedValue = `${formattedValue.slice(0, 2)} / ${formattedValue.slice(2, 4)}`.trim();
            } else {
                formattedValue = formattedValue.slice(0, 2); // Allow two digits before the slash
            }
            setFormData({ ...formData, [name]: formattedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Function to validate the form before submission
    const validateCardNumber = (cardNumber) => {
        const sanitizedCardNumber = cardNumber.replace(/\s+/g, ''); // Remove spaces
        return sanitizedCardNumber.length === 16; // Check if the card number has 16 digits
    };

    const validateExpiryDate = (expiryDate) => {
        const sanitizedExpiryDate = expiryDate.replace(/\s+/g, '').replace('/', ''); // Remove spaces and '/'
        return sanitizedExpiryDate.length === 4; // Check if the expiry date has 4 digits (MMYY)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateCardNumber(formData.cardNumber)) {
            toast.error('Card number must be 16 digits long.', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        if (!validateExpiryDate(formData.expiryDate)) {
            toast.error('Expiry date must be in MM / YY format.', {
                position: 'top-right',
                autoClose: 3000,
            });
            return;
        }

        console.log('Form Data:', formData);  // Log the form data before sending
        try {
            const response = await axios.post('http://localhost:5000/api/cards/add', {
                ...formData,
                email: userEmail,
            });
            toast.success(response.data.message || 'Card added successfully!', {
                position: 'top-right',
                autoClose: 3000,
            });
            setFormData({
                cardNumber: '',
                cardHolderName: '',
                expiryDate: '',
                cvv: '',
            });
            setTimeout(() => navigate('/userpayment'), 1000);
        } catch (error) {
            console.error('Error during card addition:', error);  // Log the error details
            toast.error(error.response?.data?.message || 'Failed to add card.', {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };


    return (
        <>
            <Navbar />
            <div className="add-credit-card-container">
                <form className="credit-card-form" onSubmit={handleSubmit}>
                    <h2>Add Credit Card</h2>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19" // Allow for spaces
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardHolderName">Cardholder Name</label>
                        <input
                            type="text"
                            id="cardHolderName"
                            name="cardHolderName"
                            value={formData.cardHolderName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM / YY"
                                maxLength="7" // Allow for space and '/'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="password"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                maxLength="4"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Add Card</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default withAutoLogout(withAuthProtection(withRoleProtection(AddCard, ["user"])));
