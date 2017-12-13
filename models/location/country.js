var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CountrySchema =Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true }
    }
)


module.exports = mongoose.model('Country', CountrySchema)


