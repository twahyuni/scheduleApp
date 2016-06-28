const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: String,
  desc: String,
  idTeam: String,
  starred: Boolean,
  dateLastActivity: Date,
  dateLastView: Date,
  url: String,
  shortUrl: String,
  labelNames: Array,
  cards: Array,
  memberCreatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;