var User = require('../../models/user');
var encrypt=require('../../services/encryption')
var async = require('async');



exports.create_user = function (req, res, next) {
    req.checkBody('firstname', 'Firstname must not be empty.').notEmpty();
    req.checkBody('lastname', 'Lastname must not be empty.').notEmpty();
    req.checkBody('email', 'Email must not be empty.').notEmpty();
    req.checkBody('username', 'Username must not be empty.').notEmpty();
    req.checkBody('password', 'Password must not be empty.').notEmpty();


    var new_user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        password: encrypt.hashPassword(req.body.password),
        active: true,
    });
    var errors = req.validationErrors();
    if (errors) {
            console.log(errors);
    } else {
        new_user.save(function (err) {
            if (err) {
                handleError(res, err);
            } else {
                res.send(new_user);
            }
            console.log(new_user);
        });

    }

};