var Country = require('../../models/location/country');
var State = require('../../models/location/state');
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
                var result={'data':country}
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
        var result={'data':countryMap}
        res.send(result);  
      });
}

exports.specific_country=function(req, res, next){
    var countryId=req.params.countryId
    Country.findOne({_id: countryId}, function (err, country) { 
        if (err){
            res.status(500).send(err)
        }
        var result={'data':country}
        res.send(result);
     });
}

exports.delete_country=function(req, res, next){
    Country.findByIdAndRemove(req.params.countryId, function(err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Country Deleted!'});
    });
}

exports.create_state=function(req, res, next){
    req.checkBody('name', 'State name must not be empty.').notEmpty();
    req.checkBody('country', 'Country must not be empty.').notEmpty();

    var state=new State({
        name:req.body.name,
        code:req.body.code,
        country:req.body.country,
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors)
    } else {
        state.save(function (err) {
            if (err) {
                handleError(res, err);
            } else {
                var result={'data':state}
                res.send(result);
            }
        });
    } 
}

exports.get_states=function(req, res, next){
    State.find({}).populate({path:'country', select:'name code'}).
    exec({},function(err,states) {
        var stateMap = {};
    
        states.forEach(function(state) {
            stateMap[state._id] = state;
        });
        var result={'data':stateMap}
        res.send(result);  
      });
}



