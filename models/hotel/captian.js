var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CaptianSchema =new Schema(
    {
        name:{type:String,required:true},
        phone_number:{type:String,required:true},
        email:{type:String,required:true},
        city: { type: Schema.ObjectId, ref: 'City', required: true },
        hotels:[{type: Schema.ObjectId, ref: 'Hotel'}]
    }
)

module.exports = mongoose.model('Captian',CaptianSchema)