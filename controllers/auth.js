module.exports = function (req, res) {
    if (req.session && req.session.user) {
        res.send({"success": true, "user": "pomelo"});
    } else {
        res.send({"success": false});
    }
};
