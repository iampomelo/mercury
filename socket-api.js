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
                    var id2chatinfo = {};
                    if (doc.dialogs) {
                        async.each(doc.dialogs, function (dialog, callback) {
                            collection2.findOne({"id": dialog}).then(doc=> {
                                console.log(doc);
                                id2chatinfo[dialog] = {"title": doc.title, "isGroup": doc.isGroup};
                                callback();
                            }, err=>callback(err));
                        }, err=> {
                            db.close();
                            if (err) {
                                socketSendError(socket, 'dialogList', '获取消息列表失败');
                            } else {
                                socket.emit('dialogList', {"success": true, "id2chatinfo": id2chatinfo});
                            }
                        });
                    } else {
                        db.close();
                        socket.emit('dialogList', {"success": true, "id2chatinfo": id2chatinfo});
                    }
                });
            });
        }
    },
    getFriendList: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            dbHelper(db=> {
                var collection = db.collection('users');
                collection.findOne({"username": session.user.username}).then(doc=> {
                    socket.emit('friendList', {"success": true, "friends": doc ? doc.friends : []});
                    db.close();
                });
            });
        }
    },
    leaveDialog: (data, socket)=> {
        socket.leave(data.chatId);
    },
    getChatRecords: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            socket.join(data.chatId);
            dbHelper(db=> {
                var collection = db.collection('chats');
                collection.findOne({"id": data.chatId}).then(doc=> {
                    socket.emit('chatRecords', {"success": true, "records": doc ? doc.records : []});
                    db.close();
                });
            });
        }
    },
    sendMessage: (data, socket, io)=> {
        var session = socket.request.session,
            newMessage = {"from": session.user.username, "content": data.content};
        if (session && session.user) {
            dbHelper(db=> {
                var collection = db.collection('chats');
                collection.update({"id": data.chatId}, {
                    $addToSet: {
                        "records": newMessage
                    }
                }).then(()=> {
                    io.to(data.chatId).emit('newMessage', {"success": true, "newMessage": newMessage});
                    db.close();
                });
            });
        }
    },
    enterDialog: (data, socket)=> {
        var session = socket.request.session;
        if (session && session.user) {
            dbHelper(db=> {
                var collection1 = db.collection('chats');
                var collection2 = db.collection('users');
                collection1.findOne({"id": data.chatId}).then(doc=> {
                    if (!doc) {
                        async.parallel([callback=> {
                            collection1.insert({
                                "id": data.chatId,
                                "title": "chat",
                                "isGroup": false,
                                "records": []
                            }).then(()=>callback(null, 'a'));
                        }, callback=> {
                            collection2.update({"username": session.user.username}, {
                                $addToSet: {
                                    "dialogs": data.chatId
                                }
                            }).then(()=>callback(null, 'b'));
                        }], (err, results)=> {
                            if (results[0] == 'a' && results[1] == 'b') {
                                db.close();
                                socket.emit('chatRecords', {"success": true, "records": []});
                            }
                        });
                    }
                    else {
                        socket.emit('chatRecords', {"success": true, "records": doc.records});
                        db.close();
                    }
                });
            });
        }
    }
};
