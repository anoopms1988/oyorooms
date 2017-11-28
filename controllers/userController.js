var User=require('../models/user');

var async=require('async');

exports.create_user = function(req, res, next) {
    req.checkBody('firstname', 'Title must not be empty.').notEmpty();
    req.checkBody('lastname', 'Title must not be empty.').notEmpty();
    console.log("asd")
};