var mongoose = require('mongoose');
var Schema=mongoose.Schema

var CountrySchema =Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true }
    }
)

var StateSchema=Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        country: { type: Schema.ObjectId, ref: 'Country', required: true },
    }
)

var CitySchema=Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        State: { type: Schema.ObjectId, ref: 'State', required: true },
    }
)

var LocationSchema=Schema(
    {
        name:{type:String,required:true},
        code :{type:String},
        status: { type: Boolean, default:true },
        City: { type: Schema.ObjectId, ref: 'City', required: true },
    }
)

module.exports = mongoose.model('Country', CountrySchema)
module.exports = mongoose.model('State', StateSchema)
module.exports = mongoose.model('City',CitySchema)
module.exports = mongoose.model('Location', LocationSchema)