const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Team = require('../models/Team');

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

};

// update team profile
exports.postUpdateTeamProfile = (req, res, next) => {

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
