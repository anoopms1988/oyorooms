var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CitySchema=Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        state: { type: Schema.ObjectId, ref: 'State', required: true },
    }
)

module.exports = mongoose.model('City',CitySchema)