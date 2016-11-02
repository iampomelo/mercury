var config = require('../config'),
    MongoClient = require('mongodb').MongoClient;
module.exports = (fn)=> {
    MongoClient.connect(config.dbURL, (err, db)=> {
        fn(db);
    });
};
