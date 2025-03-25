const express = require('express');
const User = require('../models/User'); // Adjust path as needed
const BannedUser = require('../models/BannedUser'); // Import the BannedUser model
const router = express.Router();

// Fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Ban a user with duration
router.post('/ban-user', async (req, res) => {
    const { userId, reason, banDuration } = req.body;

    if (!userId || !reason || !banDuration) {
        return res.status(400).json({ message: 'User ID, reason, and ban duration are required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Calculate banEnd date based on the duration provided by the admin
        const banEnd = new Date();
        banEnd.setMinutes(banEnd.getMinutes() + parseInt(banDuration)); // Ban duration in minutes

        // Create a new banned user entry
        const bannedUser = new BannedUser({
            userId: user._id,
            banEnd: banEnd,
            reason: reason,
        });

        await bannedUser.save();

        // Update the user document with banned status
        user.isBanned = true;
        await user.save();

        res.status(200).json({ message: 'User banned successfully', user, bannedUser });
    } catch (err) {
        console.error('Error banning user:', err);
        res.status(500).json({ message: 'Error banning user' });
    }
});

// Delete a user
router.post('/delete-user', async (req, res) => {
    const { userId, reason } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log(`User ${user.username} removed${reason ? ` for reason: ${reason}` : ''}`);

        await User.findByIdAndDelete(userId);

        res.status(200).json({ message: `User ${user.username} deleted successfully` });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});




// Fetch users with specific role
router.post('/fetch-users', async (req, res) => {
    const { role } = req.body;

    try {
        const users = await User.find(role ? { role } : {}); // Filter by role if provided
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Update a user's ban status
router.put('/ban-user/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { userID },
            { isBanned: true },
            { new: true } // Return updated user
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User banned successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error banning user' });
    }
});

// Unban a user
router.post('/unban-user', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the banned user entry
        await BannedUser.deleteOne({ userId: user._id });

        // Update the user document to reflect unban status
        user.isBanned = false;
        await user.save();

        res.status(200).json({ message: 'User unbanned successfully', user });
    } catch (err) {
        console.error('Error unbanning user:', err);
        res.status(500).json({ message: 'Error unbanning user' });
    }
});


module.exports = router;
