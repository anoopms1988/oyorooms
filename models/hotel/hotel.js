var mongoose = require('mongoose');
var Schema=mongoose.Schema

var HotelSchema=new Schema(
    {
        name:{type:String,required:true},
        address:{type:String},
        location: { type: Schema.ObjectId, ref: 'Location', required: true },
        amenities:[{type: Schema.ObjectId, ref: 'Amenity'}]
    }
)

module.exports = mongoose.model('Hotel',HotelSchema)