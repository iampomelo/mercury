var express = require('express');
var router = express.Router();
var login = require('../controllers/login');
var auth = require('../controllers/auth');

router.get('/', function (req, res) {
    res.render('index', {title: 'Mercury'});
});

router.post('/login', login);

router.get('/anth', auth);


module.exports = router;
