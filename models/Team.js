const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  picture: { type: String, default: '' },
  website: { type: String, default: '' },
  desc: { type: String, default: '' },
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;