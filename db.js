const mongoose = require("mongoose"); 

mongoose.connect('mongodb://localhost:27017/test');
var conn = mongoose.connection;
module.exports = conn;
