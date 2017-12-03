//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/bodybuilding';
mongoose.connect(mongoDB, {
  useMongoClient: true,
  promiseLibrary: require('bluebird')
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports=db