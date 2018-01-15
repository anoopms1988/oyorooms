var mongoose = require('mongoose');
var Schema=mongoose.Schema

var PackageSchema=new Schema(
    {
        cancellation:{type:String,required:true},
    }
);