const debug = require('debug')("Service: Database");
const mongoose = require('mongoose');

const config = {};

config.connect = async(dbUri) => {
    try {
        await mongoose.connect(dbUri);
        debug("Connected to database");
    } catch (error) {
        console.error(error);
        debug("Couldn't connect to database");
        process.exit(1);
    }
}

config.disconnect = async() => {
    try {
        await mongoose.disconnect();
        debug("Disconnected from database");
    } catch (error) {
        console.error(error);
        debug("Couldn't disconnect from database");
        process.exit(1);
    }
}

module.exports = config;