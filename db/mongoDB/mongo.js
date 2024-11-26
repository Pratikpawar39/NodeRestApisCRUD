require('dotenv').config();
const { MONGOURI, MONGO_DATABASE } = process.env;
const Mongo = require('./connection/MongoConnector');

module.exports = new Mongo( MONGOURI, MONGO_DATABASE );
