const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {type: String, default: '' },
  username: { type: String, unique: true },
  picture: { type: String, default: '' },
  website: { type: String, default: '' },
  desc: { type: String, default: '' },

  membersId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  teamsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;