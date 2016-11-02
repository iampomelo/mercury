var dbHelper = require('../models/dbHelper');

exports.stateCheck = (req, res)=> {
    if (req.session && req.session.user) {
        res.send({"success": true, "user": req.session.user});
    } else {
        res.send({"success": false});
    }
};

exports.login = (req, res)=> {
    var username = req.body.username,
        password = req.body.password;
    new Promise((resolve, reject)=> {
        dbHelper(db=> {
            var collection = db.collection('users');
            collection.findOne({"username": username}).then(doc=> {
                if (doc.password == password) {
                    collection.updateOne({"username": username}, {$set: {"online": true}}).then(()=> {
                        db.close();
                        resolve(doc);
                    });
                } else {
                    db.close();
                    reject();
                }
            });
        });
    }).then(data=> {
        delete data.password;
        req.session.user = {username: username};
        res.send({"success": true, "user": data});
    }, ()=> {
        res.send({"success": false});
    });
};

exports.logout = (req, res)=> {
    if (req.session && req.session.user) {
        req.session.user = null;
        res.send({"success": true});
    } else {
        res.send({"success": false});
    }
};
