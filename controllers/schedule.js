const async = require('async');
const passport = require('passport');
const Schedule = require('../models/Schedule');
const User = require('../models/User');


exports.getScheduleList = (req, res) => {
 Schedule.find(function(err, docs){
    res.json(docs);
  });
};

// Populate all the schedule in a user and ... show schedule page?

//the path for this function is /scheduleList. this is a test.
exports.getScheduleLists = (req, res) => {
  User.findOne(req.user._id).exec(function(err, user) {
    var opts = { path: 'schedulesId', model: 'Schedule' }

    User.populate(user, opts, function (err, user) {
      res.json(user);
    })

  })
};

exports.getSchedule = (req, res) => {
  var query = req.query;
  var _id = query.id;

  if (_id) {
    Schedule.findById(_id, function(err, schedule){
      if (err) {
        console.log(err);
      }
      res.render('schedule/item', {
        title: 'Schedule',
        schedule: schedule
      });
    })
  } else {
    res.render('schedule/item', {
      title: 'Schedule'
    });
  }
};

// create new schedule
exports.postSchedule = (req, res, next) => {
  const schedule = new Schedule({  });
  schedule.save(function(err, schedule) {
    if(err){
      req.flash('error', { msg: err});
    }

    User.findOne(req.user._id, function(err, user){
      user.schedulesId.push(schedule._id);
      user.save(function(err){
        req.flash('success', { msg: 'Schedule has been created!' });
        res.redirect('/schedule');
      })
    });
  });
};

// update schedule's teamOwner

// delete team
exports.postDeleteSchedule = (req, res, next) => {
  Schedule.remove({ _id: req.schedule.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Schedule has been deleted.' });
    res.redirect('/dashboard');
  });
};

//show card in schedule
exports.getCardsInSchedule = (req, res, next) => {
  Schedule.find({}, function(err, cardsArr){


 });
};
