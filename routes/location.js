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

module.exports = router;