var dbHelper = require('./models/dbHelper'),
    socketSendError = require('./widget/utils').socketSendError,
    async = require('async');
module.exports = {
    getDialogList: (data, socket)=> {
        if (data.username) {
            console.log('123');
            dbHelper(db=> {
                var collection1 = db.collection('users'),
                    collection2 = db.collection('chats');
                collection1.findOne({"username": data.username}).then(doc=> {
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
                                socketSendError(socket, 'dialogList', '获取消息列表失败');
                            } else {
                                socket.emit('dialogList', {"success": true, "id2title": id2title});
                            }
                        });
                    }else{
                        socket.emit('dialogList', {"success": true, "id2title": id2title});
                    }
                });
            });
        }
    }

};
