var mongoose = require('mongoose');
var Schema=mongoose.Schema

var Country =require('../../models/location/country');



var StateSchema=new Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        country: { type: Schema.ObjectId, ref: 'Country', required: true }
    }
)

module.exports = mongoose.model('State', StateSchema)