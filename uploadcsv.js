require('./db');
const mongoose = require('mongoose');
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    console.log('Connected to mongodb');
    }
);

// create schema
const Schema = mongoose.Schema;
const uploadcsvSchema = new Schema({
    filename: String,
});


// create model
const uploadcsv = mongoose.model('uploadcsv', uploadcsvSchema);

module.exports = uploadcsv;


