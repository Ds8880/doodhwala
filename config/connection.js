const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/doodhwala')
        .then(() => console.log('Connected successfully'))
        .catch(err => console.error('No Connected!', err));
}

module.exports = dbConnection;