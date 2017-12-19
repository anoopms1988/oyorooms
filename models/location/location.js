var mongoose = require('mongoose');
var Schema=mongoose.Schema

var LocationSchema=Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        city: { type: Schema.ObjectId, ref: 'City', required: true },
    }
)

module.exports = mongoose.model('Location', LocationSchema)