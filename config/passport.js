'use strict';
const passport = require('passport');
const Strategy = require('passport-local');
var User = require('../models/user');
var encrypt = require('../services/encryption')

passport.use(new Strategy(
  function (username, password, done) {
    User.findOne({ 'username': username }).exec(function (error, user) {
      if(error){
        console.log(error);
      }
      if (encrypt.comparePassword(password, user.password)) {
        done(null, user);
      }
      else {
        done(null, false);
      }
    });
    // database dummy - find user and verify password
    // if (username === 'devils name' && password === '666') {
    //   done(null, {
    //     id: 666,
    //     firstname: 'devils',
    //     lastname: 'name',
    //     email: 'devil@he.ll',
    //     verified: true
    //   });
    // }
    // else {
    //   done(null, false);
    // }
  }
));



module.exports = passport;

