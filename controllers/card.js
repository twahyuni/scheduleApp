const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Card = require('../models/Card');
const Schedule = require('../models/Schedule');
var moment = require('moment');
moment().format();

// create new card
exports.postCard = (req, res, next) => {
  const card = new Card({
    title: req.body.ncTitle,
    desc: req.body.ncDesc,
    startDate: req.body.ncStartDate,
    endDate: req.body.ncEndDate,
    startTime: req.body.ncStartTime,
    endTime: req.body.ncEndTime,
    scheduleId: req.body._id
  });

  card.save(function(err, card){
    if(err){
      req.flash('error', { msg: err});
    }

    // req.body cause it's triggered by form
    var scheduleId = req.body._id;

    Schedule.findById(scheduleId, function(err, schedule){
      schedule.cards.push(card._id);
      schedule.save(function(err){
        req.flash('success', { msg: 'Card created!' });

        res.redirect('/schedule?id=' + scheduleId.toString());
      })
    });
  });
};

//show card
exports.getCardsList = (req, res) => {
 Card.find(function(err, docs){
    //think a way to convert the date into date only and time only
    res.json(docs);


    // var dateString = moment.utc(value).format("YYYY-MM-DD");
    // console.log(dateString);

  });
};

// update card date, description, location, time, title


// delete card
exports.postDeleteCard = (req, res, next) => {
  Card.remove({ _id: req.card.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Card has been deleted.' });
    res.redirect('/schedule');
  });
};