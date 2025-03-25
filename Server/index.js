require('dotenv').config();  // Ensure this is at the very top
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');  // Import CORS package
const authRoutes = require('./routes/authRoutes');  // Import your routes
const cardRoutes = require('./routes/cardRoutes');
const adminRoutes = require('./routes/adminRoutes');
const lawyerRoutes = require('./routes/lawyerRoutes');
const messageRoutes = require('./routes/messageRoutes');
const fs = require('fs');
const path = require('path');

const certificatesDir = path.join(__dirname, 'uploads/certificates');
if (!fs.existsSync(certificatesDir)) {
    fs.mkdirSync(certificatesDir, { recursive: true });
}


// Use CORS middleware first
const corsOptions = {
    origin: 'http://localhost:3000', // Allow frontend from localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow credentials (cookies, sessions)
};

app.use(cors(corsOptions)); // Use CORS with the specified options

app.use(express.json());  // Middleware for parsing incoming requests
app.use('/api/user', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lawyer', lawyerRoutes);
app.use('/api/messages', messageRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB: ', err));

// Define port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
