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
router.get('/rule',authenticate,hotel_controller.get_rules);
router.put('/rule/:ruleId',authenticate,hotel_controller.update_rule);
router.delete('/rule/:ruleId',authenticate,hotel_controller.delete_rule);
//Hotel cancellation policy
router.post('/cancellation',authenticate,hotel_controller.create_cancellation);
router.get('/cancellation/:cancellationId',authenticate,hotel_controller.specific_cancellation);
router.get('/cancellation',authenticate,hotel_controller.get_cancellations);
router.put('/cancellation/:cancellationId',authenticate,hotel_controller.update_cancellation);
router.delete('/cancellation/:cancellationId',authenticate,hotel_controller.delete_cancellation);
//Captian 
router.post('/captian',authenticate,hotel_controller.create_captian);
router.get('/captian/:captianId',authenticate,hotel_controller.specific_captian);
router.get('/captian',authenticate,hotel_controller.get_captians);
router.put('/captian/:captianId',authenticate,hotel_controller.update_captian);
router.delete('/captian/:captianId',authenticate,hotel_controller.delete_captian);

module.exports = router;

