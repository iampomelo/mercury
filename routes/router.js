var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth');

router.get('/', function (req, res) {
    res.render('index', {title: 'Mercury'});
});
router.get('/anth', auth.stateCheck);
router.post('/login', auth.login);
router.get('/logout',auth.logout);


module.exports = router;
