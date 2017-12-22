var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var amenity_controller =require('../controllers/hotel/amenityController');

//Amenity routes
router.post('/amenity',authenticate,amenity_controller.create_country);