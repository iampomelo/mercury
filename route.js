var express = require('express');
var router = express.Router();
var auth = require('./controllers/auth');
var chat = require('./controllers/chat');

router.get('/', function (req, res) {
    res.render('index', {title: 'Mercury'});
});
router.get('/auth', auth.stateCheck);
router.post('/login', auth.login);
router.get('/logout',auth.logout);
router.get('/dialogList',chat.getDialogList);


module.exports = router;
