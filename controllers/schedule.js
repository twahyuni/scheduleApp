const async = require('async');
const crypto = require('crypto');
const passport = require('passport');
const User = require('../models/User');

// show schedule page
exports.getSchedule = (req, res) => {
  res.render('schedule/item', {
    title: 'Schedule'
  });
};

// create new schedule

// remove card from schedule

// update schedule's teamOwner

// delete team
exports.postDeleteSchedule = (req, res, next) => {
  Schedule.remove({ _id: req.schedule.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Schedule has been deleted.' });
    res.redirect('/dashboard');
  });
};