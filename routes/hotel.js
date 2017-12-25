var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var hotel_controller =require('../controllers/hotel/hotelController');

//Amenity routes
router.post('/amenity',authenticate,hotel_controller.create_amenity);
router.get('/amenity',authenticate,hotel_controller.get_amenities);
router.get('/amenity/:amenityId',authenticate,hotel_controller.specific_amenity);
router.delete('/amenity/:amenityId',authenticate,hotel_controller.delete_amenity);

//Hotel routes
router.post('/hotel',authenticate,hotel_controller.create_hotel);
router.get('/hotel',authenticate,hotel_controller.get_hotels);
router.get('/hotel/:hotelId',authenticate,hotel_controller.specific_hotel);
router.put('/hotel/:hotelId',authenticate,hotel_controller.update_hotel);
router.delete('/hotel/:hotelId',authenticate,hotel_controller.delete_hotel);
//Hotel rules
router.post('/rule',authenticate,hotel_controller.create_rule);
router.get('/rule/:ruleId',authenticate,hotel_controller.specific_rule);

module.exports = router;

