/**
 * Parse a signed cookie string, return the decoded value
 *
 * @param {String} str signed cookie string
 * @param {String} secret
 * @return {String} decoded value
 * @api private
 */
exports.parseSignedCookie = function (str, secret) {
    return 0 == str.indexOf('s:') ? require('cookie-signature').unsign(str.slice(2), secret) : str;
};

