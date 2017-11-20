var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});

/* GET users listing. */
router.get('/',authenticate, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
