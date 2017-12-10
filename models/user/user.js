var mongoose = require('mongoose');
var Schema=mongoose.Schema

var UserSchema =Schema(
    {
        firstname:{type:String,required:true},
        lastname:{type:String,required:true},
        email:{type:String,required:true},
        username:{type:String,required:true},
        password: { type: String },
        active: { type: Boolean, default: false }
    }
);

UserSchema.virtual('fullname').get(function(){
    return firstname+' '+lastname;
});

//Export model
module.exports = mongoose.model('user', UserSchema)