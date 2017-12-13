var Country = require('../../models/location/country');
var async = require('async');

exports.create_country=function(req, res, next){
    req.checkBody('name', 'Country name must not be empty.').notEmpty();

    var country=new Country({
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
                var result={'country':country}
                res.send(result);
            }
        });
    }
    
}

exports.get_countries=function(req, res, next){
    Country.find({}, function(err, countries) {
        var countryMap = {};
    
        countries.forEach(function(country) {
            countryMap[country._id] = country;
        });
    
        res.send(countryMap);  
      });
}