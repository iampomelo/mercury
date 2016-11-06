var dbHelper = require('../models/dbHelper'),
    resSendError = require('../widget/utils').resSendError;

exports.stateCheck = (req, res)=> {
    if (req.session && req.session.user) {
        res.send({"success": true, "user": req.session.user});
    } else {
        resSendError(res, '会话超时,请重新登录');
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
        req.session.user = {"username": username};
        res.send({"success": true, "user": data});
    }, ()=> {
        resSendError(res, '账号密码错误');
    });
};

exports.logout = (req, res)=> {
    if (req.session && req.session.user) {
        var username = req.session.user;
        req.session.user = null;
        dbHelper(db=> {
            var collection = db.collection('users');
            collection.updateOne({"username": username}, {$set: {"online": false}}).then(()=> {
                db.close();
                res.send({"success": true});
            });
        });
    } else {
        resSendError(res, '用户已经退出');
    }
};
