const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

// create new card

// add attachment to card

// add labels to card

// add member to card

// add vote to card

// copy card to another schedule

// move card to another schedule

// remove attachment from card

// remove labels from card

// remove vote from card

// update card date

// update card description

// update card location

// update card time

// update card title

// delete card
exports.postDeleteCard = (req, res, next) => {
  Card.remove({ _id: req.card.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Card has been deleted.' });
    res.redirect('/schedule');
  });
};