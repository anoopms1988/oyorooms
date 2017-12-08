var bcrypt = require("bcrypt");
var async = require("async");
var lodash = require("lodash");

module.exports = {
	hashPassword : function(pwd) {
		return bcrypt.hashSync(pwd, 10);
	  },
	comparePassword :function(plainPassord,hash){
		return bcrypt.compareSync(plainPassord, hash);
	}
}