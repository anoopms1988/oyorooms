var Hotel = require('../../models/hotel/hotel');
var Amenity = require('../../models/hotel/amenity');
var async = require('async');

exports.create_amenity = function (req, res, next) {
    req.checkBody('name', 'Amenity must not be empty.').notEmpty();

    var amenity = new Amenity({
        name: req.body.name,
    });

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
    } else {
        amenity.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var result = { 'data': amenity }
                res.send(result);
            }
        });
    }
}

exports.get_amenities = function (req, res, next) {
    Amenity.find({}, function (err, amenities) {
        var amenityMap = {};

        amenities.forEach(function (amenity) {
            amenityMap[amenity._id] = amenity;
        });
        var result = { 'data': amenityMap }
        res.send(result);
    });
}

exports.specific_amenity = function (req, res, next) {
    var amenityId = req.params.amenityId
    Amenity.findOne({ _id: amenityId }, function (err, amenity) {
        if (err) {
            res.status(500).send(err)
        }
        var result = { 'data': amenity }
        res.send(result);
    });
}

exports.delete_amenity = function (req, res, next) {
    Amenity.findByIdAndRemove(req.params.amenityId, function (err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Amenity Deleted!' });
    });
}

exports.create_hotel = function (req, res, next) {
    req.checkBody('name', 'Hotel name must not be empty.').notEmpty();
    req.checkBody('address', 'Address must not be empty.').notEmpty();
    req.checkBody('location', 'Location must not be empty.').notEmpty();

    var hotel = new Hotel({
        name: req.body.name,
        codaddresse: req.body.address,
        location: req.body.location,
        amenities: [req.body.amenities]
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors)
    } else {
        hotel.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var result = { 'data': hotel }
                res.send(result);
            }
        });
    }
}

exports.get_hotels = function (req, res, next) {
    Hotel.find({}).populate({ path: 'location', select: 'name code' }).
        populate({ path: 'amenities', select: 'name' }).
        exec({}, function (err, hotels) {
            var hotelMap = {};

            hotels.forEach(function (hotel) {
                hotelMap[hotel._id] = hotel;
            });
            var result = { 'data': hotelMap }
            res.send(result);
        });
}

exports.specific_hotel = function (req, res, next) {
    var hotelId = req.params.hotelId
    Hotel.findOne({ _id: hotelId }).populate({ path: 'location', select: 'name code' }).
        populate({ path: 'amenities', select: 'name' }).exec({}, function (err, hotel) {
            if (err) {
                res.status(500).send(err)
            }
            var result = { 'data': hotel }
            res.send(result);
        });
}

exports.update_hotel = function (req, res, next) {
    var hotelId = req.params.hotelId
    var query = { _id: hotelId }
    Hotel.findOneAndUpdate(query, req.body,{new: true}).populate({ path: 'location', select: 'name code' }).
        populate({ path: 'amenities', select: 'name' }).exec({}, function (err, hotel) {
            if (err) {
                res.status(500).send(err)
            }
            var result = { 'data': hotel }
            res.send(result);
        });
}

exports.delete_hotel = function (req, res, next) {
    Hotel.findByIdAndRemove(req.params.hotelId, function (err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Hotel Deleted!' });
    });
}

