const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    email: { type: String, required: true },
    uniqueIdentifier: { type: String, required: true }, // Remove unique if it's not necessary
});


module.exports = mongoose.model('Card', cardSchema);
