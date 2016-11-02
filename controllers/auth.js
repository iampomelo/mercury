var dbHelper = require('../models/dbHelper');

exports.stateCheck = function (req, res) {
    if (req.session && req.session.user) {
        res.send({"success": true, "user": req.session.user});
    } else {
        res.send({"success": false});
    }
};

exports.login = function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    new Promise(function (resolve, reject) {
        dbHelper(function (db) {
            var collection = db.collection('users');
            collection.find({"username": username}).toArray().then(function (docs) {
                console.log(docs);
                db.close();
                if (docs[0].password == password) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }).then(function () {
        req.session.user = {username: username};
        res.send({"success": true, "user": username});
    },function () {
        res.send({"success": false});
    });
};

exports.logout = function (req, res) {
    if (req.session && req.session.user) {
        req.session.user = null;
        res.send({"success": true});
    } else {
        res.send({"success": false});
    }
};
