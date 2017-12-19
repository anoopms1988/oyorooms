var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var location_controller =require('../controllers/location/locationController');

//Country routes
router.post('/country',authenticate,location_controller.create_country);
router.get('/country',authenticate,location_controller.get_countries);
router.get('/country/:countryId',authenticate,location_controller.specific_country);
router.delete('/country/:countryId',authenticate,location_controller.delete_country);
//State routes
router.post('/state',authenticate,location_controller.create_state);
router.get('/state',authenticate,location_controller.get_states);
router.get('/state/:stateId',authenticate,location_controller.specific_state);
router.delete('/state/:stateId',authenticate,location_controller.delete_state);
//City routes
router.post('/city',authenticate,location_controller.create_city);
router.get('/city',authenticate,location_controller.get_cities);
router.get('/city/:cityId',authenticate,location_controller.specific_city);
router.delete('/city/:cityId',authenticate,location_controller.delete_city);
//Location routes
router.post('/location',authenticate,location_controller.create_location);


module.exports = router;