const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  scheduleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Schedule'},
  cardId: {type: mongoose.Schema.Types.ObjectId, ref: 'Card'},
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;