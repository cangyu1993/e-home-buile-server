let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/build-e',{ useNewUrlParser: true })

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected!')
});

module.exports = db;