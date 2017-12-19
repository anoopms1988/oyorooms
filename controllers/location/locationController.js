var Country = require('../../models/location/country');
var State = require('../../models/location/state');
var City = require('../../models/location/city');
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
    State.find({}).populate({path:'country',select:'name code'}).
    exec({},function(err,states) {
        var stateMap = {};
    
        states.forEach(function(state) {
            stateMap[state._id] = state;
        });
        var result={'data':stateMap}
        res.send(result);  
      });
}

exports.specific_state=function(req, res, next){
    var stateId=req.params.stateId
    State.findOne({_id: stateId}).populate({path:'country',select:'name code'}).exec({}, function (err, state) { 
        if (err){
            res.status(500).send(err)
        }
        var result={'data':state}
        res.send(result);
     });
}

exports.delete_state=function(req, res, next){
    State.findByIdAndRemove(req.params.stateId, function(err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'State Deleted!'});
    });
}

exports.create_city=function(req, res, next){
    req.checkBody('name', 'City name must not be empty.').notEmpty();
    req.checkBody('state', 'State must not be empty.').notEmpty();

    var city=new City({
        name:req.body.name,
        code:req.body.code,
        state:req.body.state,
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors)
    } else {
        city.save(function (err) {
            if (err) {
                res.status(500).send(err)
            } else {
                var result={'data':city}
                res.send(result);
            }
        });
    } 
}

exports.get_cities=function(req, res, next){
    City.find({}).populate({path:'state',select:'name code'}).
    exec({},function(err,cities) {
        var cityMap = {};
    
        cities.forEach(function(city) {
            cityMap[city._id] = city;
        });
        var result={'data':cityMap}
        res.send(result);  
      });
}

exports.specific_city=function(req, res, next){
    var cityId=req.params.cityId
    City.findOne({_id: cityId}).populate({path:'state',select:'name code'}).exec({}, function (err,city) { 
        if (err){
            res.status(500).send(err)
        }
        var result={'data':city}
        res.send(result);
     });
}

exports.delete_city=function(req, res, next){
    City.findByIdAndRemove(req.params.cityId, function(err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'City Deleted!'});
    });
}


