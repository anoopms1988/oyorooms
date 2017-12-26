var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CancellationSchema=new Schema(
    {
        cancellation:{type:String,required:true},
        local_rule:{type:String,required:true},
        hotel: { type: Schema.ObjectId, ref:'Hotel', required: true }
    }
)

module.exports = mongoose.model('Cancellation',CancellationSchema)