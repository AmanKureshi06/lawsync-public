const crypto = require('crypto');
const Card = require('../models/cardModel');

// Encryption function in cardController.js
const encryptData = (data) => {
    console.log('Encrypting data:', data);  // Log the raw data before encryption
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    console.log('Encrypted data:', encrypted);  // Log the encrypted data
    return encrypted;
};

// Function to generate a unique identifier based on card data
const generateUniqueIdentifier = (cardNumber, cardHolderName) => {
    // Use a hash of the card number and cardholder name
    return crypto.createHash('sha256').update(cardNumber + cardHolderName).digest('hex');
};


const addCard = async (req, res) => {
    try {
        const { cardNumber, cardHolderName, expiryDate, cvv, email } = req.body;

        if (!cardNumber || !cardHolderName || !expiryDate || !cvv || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const encryptedCardNumber = encryptData(cardNumber);
        const encryptedCvv = encryptData(cvv);

        // Generate a unique identifier (e.g., hash or UUID)
        const uniqueIdentifier = generateUniqueIdentifier(cardNumber, cardHolderName);  // Ensure this function creates a unique value

        const newCard = new Card({
            cardNumber: encryptedCardNumber,
            cardHolderName,
            expiryDate,
            cvv: encryptedCvv,
            email,
            uniqueIdentifier, // Set the unique identifier here
        });

        await newCard.save();
        res.status(201).json({ message: 'Card added successfully' });
    } catch (error) {
        console.error('Error adding card:', error);  // Log the error details
        res.status(500).json({ message: 'Failed to add card', error: error.message });
    }
};


// Delete card
const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        await Card.findByIdAndDelete(id);
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete card", error: error.message });
    }
};

module.exports = { addCard, deleteCard, encryptData };
