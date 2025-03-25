const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Lawyer = require('../models/Lawyer');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Register Lawyer
// const registerLawyer = async (req, res) => {
//     const { username, email, password, specialization } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const lawyer = await Lawyer.create({ username, email, password: hashedPassword, specialization });
//         res.status(201).json({ message: 'Lawyer registered successfully', lawyer });
//     } catch (err) {
//         res.status(500).json({ message: 'Error registering lawyer', error: err.message });
//     }
// };

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }) || await Lawyer.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

module.exports = { registerUser, registerLawyer, login };
