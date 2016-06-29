const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  name: { type: String, default: 'Title' },
  desc: { type: String, default: 'Description' },
  idTeam: String,
  starred: Boolean,
  dateLastActivity: Date,
  dateLastView: Date,
  url: String,
  shortUrl: String,
  labelNames: Array,
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
  memberCreatorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  teamsId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}],
  membersId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;