var resSendError = require('../widget/utils').resSendError;
module.exports = function (req, res, next) {
    var reg = /\.css|\.png|\.jpg|\.gif|\.html|\.js|\/$|\/login|\/logout|\/auth/i;
    if (reg.test(req.path) || req.session && req.session.user) {
        return next();
    } else resSendError(res, '会话超时,请重新登录');
};
