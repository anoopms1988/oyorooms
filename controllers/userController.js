var User=require('../models/user');

var async=require('async');

exports.create_user = function(req, res, next) {
    req.checkBody('firstname', 'Firstname must not be empty.').notEmpty();
    req.checkBody('lastname', 'Lastname must not be empty.').notEmpty();
    req.checkBody('email', 'Email must not be empty.').notEmpty();
    req.checkBody('username', 'Username must not be empty.').notEmpty();
    req.checkBody('password', 'Password must not be empty.').notEmpty();



    var user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username:req.body.username,
        password: req.body.password,
        active: true,
    });

    user.save(function (err) {
        if (err) {
             return next(err);
             }
        console.log(user);
    });
    
};