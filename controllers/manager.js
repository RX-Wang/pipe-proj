var result  = require('./result');
var daos    = require('../daos');
var utils   = require('../utils');
var logModel = require('../models').getModel('log');
var managerModel = require('../models').getModel('manager');
var common  = require('./common');
var Promise = require('bluebird');
/**
 * 登录
 * @param req
 * @param res
 * @returns {*}
 */
exports.login = function (req , res) {
    var username = req.body.username || null;   // wtgy
    var password = req.body.password || null;   // wtgy
    if (!username || !password) {
        return result.failed(result.PARAMS_ERROR , res);
    }
    var ops = {$or: [{name: username} , {phone: username}]};
    new Promise(function (reso, rej) {
        daos.findOneByOps(managerModel, ops, function (err,user) {
            if(err)
                rej(err);
            else
                reso(user);
        })
    }).then(function (user) {
        if(user) {
            if (user.password === utils.md5(password)) {
                var data = {
                    id       : user._id ,
                    nickname : user.nickname,
                    name     : user.name ,
                    time     : Date.now()
                };
                common.setCookie(data , res);
                daos.save(logModel , {
                    name      : data.name ,
                    manager_id: data.id ,
                    content   : '登陆系统[IP:' + utils.getClientIp(req) + ']'
                } , function (err , save_logs) {
                    console.log('存储日志:' + save_logs);
                });
                res.locals.auth_user = user;
                return result.success(user , res);
            } else {
                return result.failed(result.USER_LOGIN_PASSWORD_ERROR , res);
            }
        } else {
            return result.failed(result.USER_NOT_EXIST, res);
        }
    }).catch(function (err) {
        return result.failed(result.SERVER_ERROR, res);
    });
};

/**
 * 登出
 * @param req
 * @param res
 */
exports.logout = function (req , res) {
    var cookie = req.cookies[settings.cookie_name];
    var code   = '';
    try {
        code = utils.decrypt(cookie , settings.cookie_encrypt_secret);
    } catch (e) {
        res.cookie(settings.cookie_name , null , {maxAge: 0});
        return res.redirect('/management/toLogin?redirect=' + req.originalUrl);
    }
    var data = JSON.parse(code);
    daos.save(logModel , {
        name      : data.name ,
        manager_id: data.id ,
        content   : '登出系统[IP:' + utils.getClientIp(req) + ']'
    } , function (err , save_logs) {
        console.log('存储日志:' + save_logs);
    });
    res.cookie(settings.cookie_name , null , {maxAge: 0});
    res.redirect('/');
};

// API--我自己临时的添加管理员
exports.wxq_addManager = function (req, res) {
    var name = req.body.name || '';
    var password = req.body.password || '';
    var nickname = req.body.nickname || '';
    daos.save(managerModel, { name: name, password: utils.md5(password), nickname: nickname}, function (err, data) {
        result.multiReturn('王先生添加管理员', err, data, res);
    })
};