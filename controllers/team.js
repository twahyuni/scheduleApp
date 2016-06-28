const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

// show team profile page
exports.getTeam = (req, res) => {
  res.render('account/teamProfile', {
    title: 'Team Profile'
  });
};

// show team settings page
exports.getTeamSettings = (req, res) => {
  res.render('account/teamSettings', {
    title: 'Team Settings'
  });
};

// show team members
exports.getTeamMembers = (req, res) => {
  res.render('account/teamMembers', {
    title: 'Team Members'
  });
};
// create new team
exports.postTeam = (req, res, next) => {
  // Assert and sanitize any input box

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/dashboard');
  }

  const team = new Team({
    username: req.body.username,
    description: req.body.description
  });

  //if you have time, please change it to name and generate unique username from name

  Team.findOne({ username: req.body.username }, (err, existingTeam) => {
    if (existingTeam) {
      req.flash('errors', { msg: 'Account with that team name already exists.' });
      return res.redirect('/dashboard');
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/team/profile');
      });
    });
  });
};
// update team profile
exports.postUpdateTeamProfile = (req, res, next) => {
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/team/profile');
  }

  Team.findById(req.team.id, (err, user) => {
    if (err) { return next(err); }
    //change team username ??
    team.username = req.body.username || '';
    team.name = req.body.name || '';
    team.desc = req.body.desc || '';
    team.website = req.body.website || '';
    team.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The team username you have entered is already associated with an account.' });
          return res.redirect('/team/profile');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/team/profile');
    });
  });
};

// update team settings

// add team member

// update team member

// remove team member

// delete team
exports.postDeleteTeamAccount = (req, res, next) => {
  Team.remove({ _id: req.team.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'The team account has been deleted.' });
    res.redirect('/dashboard');
  });
};
