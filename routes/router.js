var express = require('express');
var router = express.Router();
var login = require('../controllers/login');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Mercury'});
});

router.post('/login', login);


module.exports = router;
