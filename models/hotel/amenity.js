var mongoose = require('mongoose');
var Schema=mongoose.Schema

var AmenitiesSchema=new Schema(
    {
        name:{type:String,required:true},
        status: { type: Boolean, default:true }
    }
)

module.exports = mongoose.model('Amenity', AmenitiesSchema)