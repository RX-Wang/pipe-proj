var md5     = require('md5');
var crypto  = require('crypto');

//加密
exports.encrypt = function (str, secret) {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};

//解密
exports.decrypt = function (str, secret) {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};

/**
 * md5 加密
 * @param param
 */
exports.md5 = function (param) {
    return md5(param);
};

/**
 * 获取 用户 IP
 * @param req
 * @returns {*}
 */
exports.getClientIp = function (req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
};