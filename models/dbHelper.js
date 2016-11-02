var config = require('../config'),
    MongoClient = require('mongodb').MongoClient;
module.exports = function (fn) {
    MongoClient.connect(config.dbURL, function (err, db) {
        fn(db);
    });
};
