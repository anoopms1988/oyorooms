var express = require('express');
var router = express.Router();
const expressJwt = require('express-jwt');  
const authenticate = expressJwt({secret : 'server secret'});