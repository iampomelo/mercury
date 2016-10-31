var config = require('../config'),
    MongoClient = require('mongodb').MongoClient;
module.exports = function (fn) {
    MongoClient.connect(config.dburl, function (err, db) {
        fn(db);
        db.close();
    });
};
