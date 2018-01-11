var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CaptianSchema =new Schema(
    {
        name:{type:String,required:true},
        phone_number:{type:String,required:true},
        email:{type:String,required:true},
        address:{type:String,required:true},
        cities: [{ type: Schema.ObjectId, ref: 'City',required:false}],
        hotels:[{type: Schema.Types.ObjectId, ref: 'Hotel',required:false}]
    }
)

module.exports = mongoose.model('Captian',CaptianSchema)