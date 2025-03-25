const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const Lawyer = require('../models/Lawyer');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/certificates'); // Destination folder for certificates
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Filename format
    },
});

const upload = multer({ storage });

router.post('/register', upload.single('certificate'), async (req, res) => {
    try {
        console.log('Request body:', req.body); // Log request data
        console.log('Uploaded file:', req.file); // Log uploaded file

        const {
            fullName,
            username,
            mobileNumber,
            email,
            password,
            rate,
            skills,
            about,
            specialty,
            experience,
        } = req.body;

        // Validate required fields
        if (!fullName || !username || !mobileNumber || !email || !password || !rate || !skills || !about || !specialty || !experience) {
            console.error('Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error('User already exists with this email');
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create a new user
        const newUser = new User({
            username,
            fullName,
            mobileNumber,
            email,
            password,
            role: 'lawyer',
        });
        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        // Create a new lawyer entry with fullName
        const newLawyer = new Lawyer({
            userId: savedUser._id,
            username,
            fullName,  // Include fullName here
            rate,
            skills: skills.split(','),
            about,
            specialty,
            experience,
            certificate: req.file ? `/uploads/certificates/${req.file.filename}` : null,
        });

        const savedLawyer = await newLawyer.save();
        console.log('Saved lawyer:', savedLawyer);

        res.status(201).json({ message: 'Lawyer registered successfully' });
    } catch (error) {
        console.error('Error during lawyer registration:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Fetch all lawyers' details, including full name
router.get("/list", async (req, res) => {
    try {
        const lawyers = await Lawyer.aggregate([
            {
                $lookup: {
                    from: "users",         // Join with users collection
                    localField: "userId",  // Lawyer's userId
                    foreignField: "_id",   // Match with _id in users
                    as: "userData"
                }
            },
            {
                $unwind: {
                    path: "$userData",
                    preserveNullAndEmptyArrays: true // Keep lawyers even if they have no users
                }
            },
            {
                $project: {
                    _id: 1,
                    fullName: 1,
                    email: "$userData.email" // Extract email from users
                }
            }
        ]);

        console.log("Fetched Lawyers:", lawyers); // Debugging log
        res.status(200).json(lawyers);
    } catch (error) {
        console.error("Error fetching lawyers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Lawyer Edit Profile
// Fetch professional details of a specific lawyer
router.post('/profile', async (req, res) => {
    try {
        const { email } = req.body;

        // Find the user to get the userId
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the lawyer using the userId
        const lawyer = await Lawyer.findOne({ userId: user._id });
        if (!lawyer) {
            return res.status(404).json({ message: 'Lawyer profile not found' });
        }

        res.status(200).json(lawyer);
    } catch (error) {
        console.error('Error fetching lawyer profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Update professional details of a lawyer
router.put('/profile', upload.single('certificate'), async (req, res) => {
    try {
        const { email, rate, skills, about, specialty, experience } = req.body;

        // Find the user to get the userId
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find and update the lawyer profile
        const updatedLawyer = await Lawyer.findOneAndUpdate(
            { userId: user._id },
            {
                rate,
                skills: skills ? skills.split(',') : [],
                about,
                specialty,
                experience,
                ...(req.file && { certificate: `/uploads/certificates/${req.file.filename}` }),
            },
            { new: true }
        );

        if (!updatedLawyer) {
            return res.status(404).json({ message: 'Lawyer profile not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', lawyer: updatedLawyer });
    } catch (error) {
        console.error('Error updating lawyer profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// ✅ Fetch lawyer details by email
router.post('/lawyer-details', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find lawyer profile
        const lawyer = await Lawyer.findOne({ userId: user._id });
        if (!lawyer) {
            return res.status(404).json({ message: 'Lawyer profile not found' });
        }

        res.status(200).json({ personalDetails: user, professionalDetails: lawyer });
    } catch (error) {
        console.error('Error fetching lawyer details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// ✅ Fetch advocate details using username
router.get('/lawyers/:username', async (req, res) => {
    try {
        let { username } = req.params;
        console.log(`Received request for lawyer: ${username}`); // Debugging

        const lawyer = await Lawyer.findOne({ username });
        if (!lawyer) {
            console.log('Lawyer not found');
            return res.status(404).json({ message: 'Lawyer not found' });
        }

        const user = await User.findById(lawyer.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User details not found' });
        }

        res.status(200).json({ personalDetails: user, professionalDetails: lawyer });
    } catch (error) {
        console.error('Error fetching advocate details:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = router;
