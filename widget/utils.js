/**
 * Parse a signed cookie string, return the decoded value
 *
 * @param {String} str signed cookie string
 * @param {String} secret
 * @return {String} decoded value
 * @api private
 */
exports.parseSignedCookie = (str, secret)=> {
    return 0 == str.indexOf('s:') ? require('cookie-signature').unsign(str.slice(2), secret) : str;
};

/**
 * Send Error information to client by HTTP
 * @param res
 * @param str
 * @param errorCode
 */
exports.resSendError = (res, str, errorCode)=> {
    res.send({success: false, message: {error_description: str, error_code: errorCode || ""}});
};
/**
 * Send Error information to client by WebSocket
 * @param socket
 * @param event
 * @param str
 * @param errorCode
 */
exports.socketSendError = (socket, event, str, errorCode)=> {
    socket.emit(event, {success: false, message: {error_description: str, error_code: errorCode || ""}});
};
