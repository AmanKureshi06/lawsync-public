const mongoose = require('mongoose');

const userImageSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    imagePath: { type: String, required: true }, // Path to the uploaded image
});

const UserImage = mongoose.model('UserImage', userImageSchema);

module.exports = UserImage;
