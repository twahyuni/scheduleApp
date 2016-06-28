const async = require('async');
const passport = require('passport');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

// show schedule page
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
  // create new schedule with id

  // put the schedule id inside userSchema
  const schedule = new Schedule({});
  schedule.save(function() {    // User.schedulesId.push();
    req.flash('success', { msg: 'Schedule has been created.' });
    res.send({redirect:'/schedule'});
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
