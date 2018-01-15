var Hotel = require('../../models/hotel/hotel');
var Amenity = require('../../models/hotel/amenity');
var Rule = require('../../models/hotel/rule');
var Cancellation = require('../../models/hotel/cancellation');
var Captian = require('../../models/hotel/captian');
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
    Hotel.findOneAndUpdate(query, req.body, { new: true }).populate({ path: 'location', select: 'name code' }).
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

exports.create_rule = function (req, res, next) {
    req.checkBody('check_in', 'Check in must not be empty.').notEmpty();
    req.checkBody('check_out', 'Check out must not be empty.').notEmpty();
    req.checkBody('hotel', 'Hotel out must not be empty.').notEmpty();

    var rule = new Rule({
        check_in: req.body.check_in,
        check_out: req.body.check_out,
        nationality: req.body.nationality,
        hotel: req.body.hotel
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors)
    } else {
        rule.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var result = { 'data': rule }
                res.send(result);
            }
        });
    }
}

exports.specific_rule = function (req, res, next) {
    var ruleId = req.params.ruleId
    Rule.findOne({ _id: ruleId }).populate({ path: 'hotel', select: 'name' }).exec({}, function (err, rule) {
        if (err) {
            res.send(err)
        }
        var result = { 'data': rule }
        res.send(result);
    });
}

exports.get_rules = function (req, res, next) {
    Rule.find({}).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, rules) {
            var ruleMap = {};
            rules.forEach(function (rule) {
                ruleMap[rule._id] = rule;
            });
            var result = { 'data': ruleMap }
            res.send(result);
        });
}

exports.update_rule = function (req, res, next) {
    var ruleId = req.params.ruleId
    var query = { _id: ruleId }
    Rule.findOneAndUpdate(query, req.body, { new: true }).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, rule) {
            if (err) {
                res.status(500).send(err)
            }
            var result = { 'data': rule }
            res.send(result);
        });
}

exports.delete_rule = function (req, res, next) {
    Rule.findByIdAndRemove(req.params.ruleId, function (err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Hotel Deleted!' });
    });
}

exports.create_cancellation = function (req, res, next) {
    req.checkBody('cancellation', 'Cancellation must not be empty.').notEmpty();
    req.checkBody('local_policy', 'Local policy must not be empty.').notEmpty();
    req.checkBody('hotel', 'Hotel must not be empty.').notEmpty();

    var cancellation = new Cancellation({
        cancellation: req.body.cancellation,
        local_policy: req.body.local_policy,
        hotel: req.body.hotel,
    });

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
    } else {
        cancellation.save(function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                var result = { 'data': cancellation }
                res.send(result);
            }
        });
    }
}

exports.specific_cancellation = function (req, res, next) {
    var cancellationId = req.params.cancellationId
    Cancellation.findOne({ _id: cancellationId }).populate({ path: 'hotel', select: 'name' }).exec({}, function (err, cancellation) {
        if (err) {
            res.send(err)
        }
        var result = { 'data': cancellation }
        res.send(result);
    });
}

exports.get_cancellations= function (req, res, next) {
    Cancellation.find({}).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, cancellations) {
            var cancellationMap = {};
            cancellations.forEach(function (cancellation) {
                cancellationMap[cancellation._id] = cancellation;
            });
            var result = { 'data': cancellationMap }
            res.send(result);
        });
}

exports.update_cancellation= function (req, res, next) {
    var cancellationId = req.params.cancellationId
    var query = { _id: cancellationId }
    Cancellation.findOneAndUpdate(query, req.body, { new: true }).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, cancellation) {
            if (err) {
                res.status(500).send(err)
            }
            var result = { 'data': cancellation }
            res.send(result);
        });
}

exports.delete_cancellation= function (req, res, next) {
    Cancellation.findByIdAndRemove(req.params.cancellationId, function (err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Cancellation Deleted!' });
    });
}

exports.create_captian = function (req, res, next) {
    req.checkBody('name', 'Captian name must not be empty.').notEmpty();
    req.checkBody('phone_number', 'Phone number must not be empty.').notEmpty();
    req.checkBody('email', 'Email must not be empty.').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();

    var captian = new Captian({
        name: req.body.name,
        phone_number: req.body.phone_number,
        email: req.body.email,
        address:req.body.address,
        cities: [req.body.cities],
        hotels: [req.body.hotels],
    }
    );

    var errors = req.validationErrors();
    if (errors) {
        res.status(500).send(errors)
    } else {
        captian.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                var result = { 'data': captian }
                res.send(result);
            }
        });
    }
}

exports.specific_captian = function (req, res, next) {
    var captianId = req.params.captianId
    Captian.findOne({ _id: captianId }).populate({ path: 'cities', select: 'name' }).exec({}, function (err, captian) {
        if (err) {
            res.send(err)
        }
        var result = { 'data': captian }
        res.send(result);
    });
}

exports.get_captians= function (req, res, next) {
    Captian.find({}).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, captains) {
            var captianMap = {};
            captains.forEach(function (captain) {
                captianMap[captain._id] = captain;
            });
            var result = { 'data': captianMap }
            res.send(result);
        });
}

exports.update_captian= function (req, res, next) {
    var captianId = req.params.captianId
    var query = { _id: captianId }
    Captian.findOneAndUpdate(query, req.body,{ new: true }).populate({ path: 'hotel', select: 'name' }).
        exec({}, function (err, captian) {
            if (err) {
                res.status(500).send(err)
            }
            var result = { 'data': captian }
            res.send(result);
        });
}

exports.delete_captian= function (req, res, next) {
    Captian.findByIdAndRemove(req.params.captianId, function (err) {
        if (err)
            res.send(err);
        else
            res.status(204).json({ message: 'Captian Deleted!' });
    });
}