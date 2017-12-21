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