const async = require('async');
const passport = require('passport');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

exports.getScheduleList = (req, res) => {
 // Schedule.find(function(err, docs){
 //    res.json(docs);
 //  });
 // .findOne(req.user._id)
 // {_id: ObjectId(req.schedule._id)}
 Schedule
    .find()
    .populate('cards')
    .exec(function(err, schedule) {
        var opts = { path: 'cards', model: 'Card' }

       Schedule.populate(schedule, opts, function (err, schedule) {
         res.json(schedule);
       })

  })
};

exports.getSchedule = (req, res) => {
  var query = req.query;
  var _id = query.id;

  if (_id) {
    Schedule
      .findById(_id)
      .populate('cards')
      .exec(function(err, schedule) {
        if (err) {
          console.log(err);
        }
        var opts = { path: 'cards', model: 'Card' }

        Schedule.populate(schedule, opts, function (err, schedule) {
            res.render('schedule/item', {
              title: 'Schedule',
              schedule: schedule
            });
          })
       })
  } else {
    res.render('schedule/item', {
      title: 'Schedule'
    });
  }
};

// create new schedule
exports.postSchedule = (req, res, next) => {
  const schedule = new Schedule({
      membersId: req.user._id,
      memberCreatorId: req.user._id
   });
  schedule.save(function(err, schedule) {
    if(err){
      req.flash('error', { msg: err});
    }

    User.findOne(req.user._id, function(err, user){
      user.schedulesId.push(schedule._id);
      user.save(function(err){
        req.flash('success', { msg: 'Schedule has been created!' });

        // add res JSON and attached to response in createSchedule function , main.js file
        res.json(schedule._id);
      })

    });
  });
};
// update schedule's teamOwner

// delete schedule
exports.deleteSchedule = (req, res, next) => {
  // Schedule.remove({ _id: req.params.id }, (err) => {
  //   if (err) { return next(err); }
  //   req.flash('info', { msg: 'Schedule has been deleted.' });
  // });


  Schedule.findOne({ _id: req.params.id }, (err, schedule) => {
    if (err) { return next(err); }

    var target = req.params.id;

    User.findById(schedule.membersId, function(err, user){

      user.findOneAndUpdate({schedulesId: target}, (err, scheduleId) => {
        if (err) { return next(err); }
        console.log(scheduleId);
      });

    });

    // schedule.remove();
    req.flash('info', { msg: 'Schedule has been deleted.' });
  });
};

//update schedule
exports.putSchedule = (req, res, next) => {
  Schedule.findById(req.params.id, (err, schedule) => {
    if (err) { return next(err); }

    schedule.name = req.body.name;
    schedule.desc = req.body.desc;
    schedule.save();

    });
};