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
    // multer 方式上传--START   需要先在 router中进行处理
    var temp_path = req.file.path;
    var _originalName = req.file.originalname;
    var ext = '.' + req.file.originalname.split('.')[1];
    var target_path = req.file.path + ext;
    var _filename = req.file.filename + ext;
    var filePath = '/upload/' + _filename;
    /**
     * -- 根据文件流校验文件类型
     */
    var buffer = new Buffer(8);
    var fd = fs.openSync(req.file.path, 'r');  //  这里用 上传文件时 的路径
    fs.readSync(fd, buffer, 0, 8, 0);
    var newBuf = buffer.slice(0, 4);
    var head_1 = newBuf[0].toString(16);
    var head_2 = newBuf[1].toString(16);
    var head_3 = newBuf[2].toString(16);
    var head_4 = newBuf[3].toString(16);
    var typeCode = head_1 + head_2 + head_3 + head_4;
    var filetype = '';
    var mimetype;
    switch (typeCode){
        case 'ffd8ffe0':
            filetype = 'jpg';
            mimetype = ['image/jpg'];
            break;
        case 'ffd8ffe1':
            filetype = 'jpg';
            mimetype = ['image/jpeg', 'image/pjpeg'];
            break;
        case '47494638':
            filetype = 'gif';
            mimetype = 'image/gif';
            break;
        case '89504e47':
            filetype = 'png';
            mimetype = ['image/png', 'image/x-png'];
            break;
        case '504b34':
            filetype = 'zip';
            mimetype = ['application/x-zip', 'application/zip', 'application/x-zip-compressed'];
            break;
        case '2f2aae5':
            filetype = 'js';
            mimetype = 'application/x-javascript';
            break;
        case '2f2ae585':
            filetype = 'css';
            mimetype = 'text/css';
            break;
        case '5b7bda':
            filetype = 'json';
            mimetype = ['application/json', 'text/json'];
            break;
        case '3c212d2d':
            filetype = 'ejs';
            mimetype = 'text/html';
            break;
        default:
            filetype = 'unknown';
            break;
    }
    fs.closeSync(fd);
    var a = {
        fileType : filetype,
        mimeType : mimetype
    };
    if (filetype === 'jpg' || filetype === 'png') {
        console.log("Uploading: " + _filename);
        fs.rename(temp_path, target_path, function(err,data) {
          cb(null, { file_path: filePath, _originalName: _originalName });
        });
    } else {
        cb(new Error('文件类型错误'));
    }
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
    var _url = req.originalUrl
    if (_url.indexOf('toLogin') === -1 && _url.indexOf('/management/login') === -1) {
        if (cookie) {
            var code = '';
            try {
                code = utils.decrypt(cookie , settings.cookie_encrypt_secret);
            } catch (e) {
                res.cookie(settings.cookie_name , null , {maxAge: 0});
                return res.redirect('/management/toLogin?redirect=' + _url);
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
                    return next();
                } else {
                    //清理cookie
                    res.cookie(settings.cookie_name , null , {maxAge: 0});
                }
            }
        }
        return res.redirect('/management/toLogin?redirect=' + _url);
    }
    next();
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