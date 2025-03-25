
const express = require('express');
const { addCard } = require('../controllers/cardController');
const crypto = require('crypto');
const Card = require('../models/cardModel'); // Ensure you are importing your Card model correctly
const router = express.Router();
// Decryption function in cardRoutes.js
const decryptData = (encryptedData) => {
    try {
        console.log('Decrypting data:', encryptedData);  // Log the data before decryption
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        // console.log('Decrypted data:', decrypted);  // Log the decrypted data
        return decrypted;
    } catch (err) {
        console.error('Decryption error:', err);
        return null;
    }
};
router.post('/add', addCard);

// Route to fetch user cards based on email
router.post("/getUserCards", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }

        const userCards = await Card.find({ email: email });

        if (!userCards || userCards.length === 0) {
            return res.status(404).json({ message: "No cards found." });
        }

        const decryptedCards = userCards.map(card => {
            const decryptedCardNumber = decryptData(card.cardNumber);
            const decryptedCvv = decryptData(card.cvv);

            if (!decryptedCardNumber || !decryptedCvv) {
                console.error('Decryption failed for card:', card);
                return null;
            }

            return {
                ...card.toObject(),
                cardNumber: decryptedCardNumber,
                cvv: decryptedCvv,
            };
        }).filter(card => card !== null); // Filter out cards with decryption failure

        if (decryptedCards.length === 0) {
            return res.status(500).json({ message: "Failed to decrypt card details." });
        }

        res.status(200).json({ cards: decryptedCards });
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: "Error fetching card details.", error });
    }
});

// Delete a card by ID
router.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Card ID is required." });
        }

        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found." });
        }

        res.status(200).json({ message: "Card deleted successfully." });
    } catch (error) {
        console.error("Error deleting card:", error);
        res.status(500).json({ message: "Error deleting card." });
    }
});


module.exports = router;