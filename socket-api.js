var dbHelper = require('./models/dbHelper'),
    socketSendError = require('./widget/utils').socketSendError,
    async = require('async');
module.exports = {
    getDialogList: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            dbHelper(db=> {
                var collection1 = db.collection('users'),
                    collection2 = db.collection('chats');
                collection1.findOne({"username": session.user.username}).then(doc=> {
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
                    } else {
                        db.close();
                        socket.emit('dialogList', {"success": true, "id2title": id2title});
                    }
                });
            });
        }
    },
    enterDialog: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            socket.join(data.id);
            socket.emit('enterDialogResult.' + session.user.username, {"success": true});
        }
    },
    getChatRecords: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            dbHelper(db=> {
                var collection = db.collection('chats');
                collection.findOne({"id": data.id}).then(doc=> {
                    socket.emit('chatRecords', {"success": true, "records": doc ? doc.records : []});
                    db.close();
                });
            });
        }
    }
};
