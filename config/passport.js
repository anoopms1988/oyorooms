'use strict';

const passport = require('passport');  
const Strategy = require('passport-local');

passport.use(new Strategy(  
  function(username, password, done) {
    // database dummy - find user and verify password
    if(username === 'devils name' && password === '666'){
      done(null, {
        id: 666,
        firstname: 'devils',
        lastname: 'name',
        email: 'devil@he.ll',
        verified: true
      });
    }
    else {
      done(null, false);
    }
  }
));

function serialize(req, res, next) {  
    db.updateOrCreate(req.user, function(err, user){
      if(err) {return next(err);}
      // we store the updated information in req.user again
      req.user = {
        id: user.id
      };
      next();
    });
  }
  
 

  const jwt = require('jsonwebtoken');
  
  function generateToken(req, res, next) {  
    req.token = jwt.sign({
      id: req.user.id,
    }, 'server secret', {
      expiresInMinutes: 120
    });
    next();
  }

  function respond(req, res) {  
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }

module.exports = passport;