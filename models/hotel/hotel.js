var mongoose = require('mongoose');
var Schema=mongoose.Schema
var Amenity = require('../../models/hotel/amenity');

var HotelSchema=new Schema(
    {
        name:{type:String,required:true},
        address:{type:String},
        location: { type: Schema.ObjectId, ref: 'Location', required: true },
        amenities:[{type: Schema.Types.ObjectId, ref: 'Amenity'}]
    }
)

module.exports = mongoose.model('Hotel',HotelSchema)