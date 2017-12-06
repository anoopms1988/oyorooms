//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/bodybuilding';


mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

