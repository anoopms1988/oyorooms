var mongoose = require('mongoose');
var Schema=mongoose.Schema

var RuleSchema=new Schema(
    {
        check_in:{type:String,required:true},
        check_out:{type:String,required:true},
        nationality:{type:String,enum : ['All','Indian'],default:'Indian'},
        hotel: { type: Schema.ObjectId, ref:'Hotel', required: true }
    }
)

module.exports = mongoose.model('Rule',RuleSchema)