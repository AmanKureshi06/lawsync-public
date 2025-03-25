const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Register a user
router.post("/register/user", async (req, res) => {
  const { username, email, mobileNumber, password } = req.body;

  if (!username || !email || !mobileNumber || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = new User({
      username,
      email, // Email will be normalized in the pre-save hook
      mobileNumber,
      password, // Password will be hashed in the pre-save hook
    });

    await newUser.save();
    const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   console.error("User already exists with this email");
    //   return res
    //     .status(400)
    //     .json({ message: "User already exists with this email" });
    // }

    // Respond with success message and the generated userID
    res.status(201).json({
      message: "User registered successfully",
      userID: newUser._id, // Returning the generated userID
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already in use" });
    }
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailNormalized = email.trim().toLowerCase(); // Normalize email
    const user = await User.findOne({ email: emailNormalized });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user is banned
    if (user.isBanned) {
      return res
        .status(403)
        .json({ message: "Your account is banned. Please contact support." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch user profile
router.post("/profile", async (req, res) => {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      fullName: user.username,
      mobileNumber: user.mobileNumber,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// Fetch user role
router.post("/role", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user's role
    res.status(200).json({ role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user role" });
  }
});

// Update user profile
router.put("/profile", async (req, res) => {
  const { email, fullName, mobileNumber } = req.body; // Accept updated data
  if (!fullName || !mobileNumber || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { username: fullName, mobileNumber },
      { new: true } // Return the updated document
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user profile" });
  }
});

// Update user password
router.post("/update-password", async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find the user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Ensure the new password is different from the current password
    if (await bcrypt.compare(newPassword, user.password)) {
      return res.status(400).json({ message: "New password cannot be the same as the current password" });
    }

    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Directly update password in the database
    await User.updateOne({ email: normalizedEmail }, { password: hashedPassword });

    console.log("Password updated successfully for user:", normalizedEmail);

    res.status(200).json({ message: "Password updated successfully. Please log in again." });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});


// Check if user exists by username or email
router.post("/check-user-existence", async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if username or email already exists
    const userByUsername = await User.findOne({ username });
    const userByEmail = await User.findOne({ email });

    if (userByUsername || userByEmail) {
      return res.status(400).json({ exists: true }); // Correct response when exists
    }

    res.status(200).json({ exists: false }); // Correct response when doesn't exist
  } catch (err) {
    console.error("Error checking user existence:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Validate user password
router.post("/validate-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Password is valid" });
  } catch (err) {
    console.error("Error validating password:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
