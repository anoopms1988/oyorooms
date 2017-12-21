var Hotel=require('../../models/hotel/hotel');
var Amenity=require('../../models/hotel/amenity');
var async = require('async');

exports.create_amenity=function(req, res, next){
    req.checkBody('name', 'Amenity must not be empty.').notEmpty();

    var amenity=new Amenity({
        name:req.body.name,
    });

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
    } else {
        amenity.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var result={'data':amenity}
                res.send(result);
            }
        });
    }
}

exports.get_amenities=function(req, res, next){
    Amenity.find({}, function(err, amenities) {
        var amenityMap = {};
    
        amenities.forEach(function(amenity) {
            amenityMap[amenity._id] = amenity;
        });
        var result={'data':amenityMap}
        res.send(result);  
      });
}

exports.specific_amenity=function(req, res, next){
    var amenityId=req.params.amenityId
    Amenity.findOne({_id: amenityId}, function (err, amenity) { 
        if (err){
            res.status(500).send(err)
        }
        var result={'data':amenity}
        res.send(result);
     });
}

exports.delete_amenity=function(req, res, next){
    Amenity.findByIdAndRemove(req.params.amenityId, function(err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Amenity Deleted!'});
    });
}