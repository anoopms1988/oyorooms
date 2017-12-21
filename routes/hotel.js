var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var hotel_controller =require('../controllers/hotel/hotelController');

//Amenity routes
router.post('/amenity',authenticate,hotel_controller.create_amenity);

module.exports = router;