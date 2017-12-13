var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var location_controller =require('../controllers/location/locationController');

//Country routes
router.post('/country',authenticate,location_controller.create_country);
router.get('/country',authenticate,location_controller.get_countries);

module.exports = router;