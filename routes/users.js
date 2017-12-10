var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

var user_controller =require('../controllers/user/userController')

/* GET users listing. */
router.get('/',authenticate, function(req, res, next) {
  res.send('respond with a resource');
});

//Authentication 
router.post('/signup',authenticate,user_controller.create_user);
router.post('/logout',authenticate,user_controller.logout);


module.exports = router;


