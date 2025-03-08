const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((data) => console.log('Connected successfully'))
        .catch(err => console.error('No Connected!', err));
}

module.exports = dbConnection;