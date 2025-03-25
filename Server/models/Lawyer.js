// models/Lawyer.js
const mongoose = require('mongoose');

const LawyerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true }, // If username is needed
    fullName: { type: String, required: true }, // Added fullName field
    rate: { type: Number, required: true },
    skills: [{ type: String, required: true }],
    about: { type: String, required: true },
    specialty: { type: String, required: true },
    experience: { type: String, required: true },
    certificate: { type: String },
});

module.exports = mongoose.model('Lawyer', LawyerSchema);
