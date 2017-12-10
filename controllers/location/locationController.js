var LocationModels = require('../../models/location/location');
var async = require('async');

exports.create_country=function(req, res, next){
    req.checkBody('name', 'Country name must not be empty.').notEmpty();

    var country=new LocationModels.Country({
        name:req.body.name,
        code:req.body.code
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
    } else {
        country.save(function (err) {
            if (err) {
                handleError(res, err);
            } else {
                res.send(country);
            }
            console.log(country);
        });
    }
    
}