const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

  dateLastActivity: Date,
  desc: { type: String, default: '' },
  idBoard: String,
  idMembersVoted: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  idLabels: Array,
  name: String,
  shortLink: String,
  shortUrl: String,
  url: String,
  subscribed: Boolean,
  badges: {
    votes: Number,
    subscribed: Boolean,
    comments: Number,
    attachments: Number,
    description: Boolean,
  },
  startTime: Date,
  endTime: Date,
  startDate: Date,
  endDate: Date,
  idMembers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  labels: [
    {
    idSchedule: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
    name: String,
    color: String,
    },
  ],
  attachments: [
    {
      date: Date,
      idMember: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      isUpload: Boolean,
      name: String,
      previews: Array,
      url: String,
      id: String
    }
  ]

}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;