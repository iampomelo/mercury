var dbHelper = require('../models/dbHelper'),
    resSendError = require('../widget/utils').resSendError,
    async = require('async');

exports.getDialogList = (req, res)=> {
    if (req.session.user.username) {
        dbHelper(db=> {
            var collection1 = db.collection('users'),
                collection2 = db.collection('chats');
            collection1.findOne({"username": req.session.user.username}).then(doc=> {
                var id2title = {};
                if (doc.dialogs) {
                    async.each(doc.dialogs, function (dialog, callback) {
                        collection2.findOne({"id": dialog}).then(doc=> {
                            id2title[dialog] = doc.title;
                            callback();
                        }, err=>callback(err));
                    }, err=> {
                        db.close();
                        if (err) {
                            resSendError(res, '获取消息列表失败');
                        } else {
                            res.send({"success": true, "id2title": id2title});
                        }
                    });
                }else{
                    res.send({"success": true, "id2title": id2title});
                }
            });
        });
    }
};
