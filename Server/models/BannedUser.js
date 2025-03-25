const mongoose = require('mongoose');

const bannedUserSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    banStart: { type: Date, default: Date.now },
    banEnd: { type: Date, required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

const BannedUser = mongoose.model('BannedUser', bannedUserSchema);

module.exports = BannedUser;
