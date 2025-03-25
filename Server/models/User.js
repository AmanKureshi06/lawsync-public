const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const userSchema = new mongoose.Schema({
    userID: { type: String, unique: true, default: uuidv4 }, // Generate unique ID by default
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isBanned: { type: Boolean, default: false } // Add 'isBanned' field
});

// Normalize email and hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('email')) {
        this.email = this.email.trim().toLowerCase();
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
