const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Card = require('../models/Card');
const Schedule = require('../models/Schedule');

// create new card
exports.postCard = (req, res, next) => {

  const card = new Card({
    title: req.body.ncTitle,
    desc: req.body.ncDesc,
    startDate: req.body.ncStartDate,
    endDate: req.body.ncEndDate,
    startTime: req.body.ncStartTime,
    endTime: req.body.ncEndTime
  });

  card.save(function(err, card){
    if(err){
      req.flash('error', { msg: err});
    }

    // error cannot find id of  undefined ????
    Schedule.findOne(req.body.schedule._id, function(err, schedule){
      schedule.cards.push(card._id);
      schedule.save(function(err){
        req.flash('success', { msg: 'Card created!' });
        res.redirect('/schedule');
      })
    });
  });

  /*
   card.save((err) => {
      req.flash('success', { msg: 'Card created!' });
      res.redirect('/schedule');
    });
  */

};

//show card
// exports.getCards = (req, res) => {
//   //loop through the cards array of that schedule
//   var cards = Card.find();
//   res.render(cards);
// }


// copy card to another schedule

// move card to another schedule


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