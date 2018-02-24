var fs      = require('fs');
var moment  = require('moment');
var utils   = require('../utils');
var settings = require('../config').settings;


function setCookie(data , res) {
    var source = JSON.stringify(data);
    var code = utils.encrypt(source , settings.cookie_encrypt_secret);
    res.cookie(settings.cookie_name , code);
}

exports.setCookie = setCookie;

exports.upload_file = function(req, res, cb) {
  try {
    // multer 方式上传--START   需要现在 router中进行处理
    var temp_path = req.file.path;
    var ext = '.' + req.file.originalname.split('.')[1];
    var target_path = req.file.path + ext;
    var _filename = req.file.filename + ext;
    var filePath = '/upload/' + _filename;
    console.log("Uploading: " + _filename);
    fs.rename(temp_path, target_path, function(err,data) {
      cb(null, { file_path: filePath });
    });
    // multer 方式上传--END
  } catch (e) {
    cb(e);
  }
};

/**
 * 验证登录
 * @param req
 * @param res
 * @param next
 */
exports.auth_user = function (req , res , next) {
    var cookie = req.cookies[settings.cookie_name];
    if (cookie) {
        var code = '';
        try {
            code = utils.decrypt(cookie , settings.cookie_encrypt_secret);
        } catch (e) {
            res.cookie(settings.cookie_name , null , {maxAge: 0});
            return res.redirect('/management/toLogin?redirect=' + req.originalUrl);
        }

        var data = JSON.parse(code);
        if (data && data.id) {
            var lapse = (Date.now() - data.time);
            //超过20分钟没有动作则过期
            if (lapse < (60 * 1000 * 20)) {
                //每一分钟更新一次最新动作时间
                if (lapse >= (60 * 1000)) {
                    data.time = Date.now();
                    setCookie(data , res);
                }
                req.user             = data;
                res.locals.auth_user = req.user;
            } else {
                //清理cookie
                res.cookie(settings.cookie_name , null , {maxAge: 0});
            }
        }
    }
    if (req.user && req.user.id) {
        next();
    } else {
        res.redirect('/management/toLogin?redirect=' + req.originalUrl);
    }
};

/**
 * 格式化时间
 * @param data
 * @param target 待格式化的字段，及格式。 如： { created_at: 'YYYY-MM-DD HH:mm:ss'}
 */
exports.formatTime = function (data, target) {
    if(!target)
        throw new Error('Param: target is required!');
    else {
        if(Array.isArray(data)){
            return data.map(function (d) {
                return formatObj(d._doc, target);
            })
        } else {
            return formatObj(data, target);
        }
    }

    function formatObj(objData, formater) {
        for(var key in formater) {
            objData[key] = moment(objData[key]).format(formater[key]);
        }
        return objData;
    }
};