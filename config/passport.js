'use strict';
const passport = require('passport');
const Strategy = require('passport-local');
var User = require('../models/user/user');
var encrypt = require('../services/encryption')

passport.use(new Strategy(
  function (username, password, done) {
    User.findOne({ 'username': username }).exec(function (error, user) {
      if(error){
        done(null, false);
      }
      if (encrypt.comparePassword(password, user.password)) {
        done(null, user);
      }
      else {
        done(null, false);
      }
    });
    done(null, false);
    
  }

));



module.exports = passport;

