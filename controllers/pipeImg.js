var fs           = require('fs');
var Promise      = require('bluebird');
var pipeImgDao   = require("../daos/pipeImg");
var daos         = require("../daos");
var result       = require("./result");
var moment       = require("moment");
var common       = require('./common');
var bgImgModel = require('../models').getModel('bgImg');

var PipeImgController = {};

/**
 * 渲染背景图片管理首页
 * @param req
 * @param res
 */
PipeImgController.renderIndex = function (req, res) {
    res.render('bgImg/index');
};
/**
 * 保存背景图片
 * @param req
 * @param res
 * @returns {*}
 */
PipeImgController.addImg = function (req, res) {
    var bgImgName     = req.body.bgImgName || null;
    var bgPosition_id = req.body.bgPosition_id || null;
    var useStatus     = req.body.useStatus || null;
    var imgUrl        = req.body.imgUrl || null;
    var description   = req.body.description || 1;
    if (!bgImgName || !bgPosition_id || !useStatus || !imgUrl) {
        return result.failed(result.PARAMS_ERROR, res);
    }
    new Promise(function(reso, rej) {
        daos.findOneByOps(bgImgModel, { bgImgName: bgImgName}, function(err, bgImg) {
            if(err) {
                return rej(err);
            }
            return reso(bgImg);
        })
    }).then(function(bgImg) {
        if(bgImg) {
            return result.failed(result.BGNAME_DUPLICATED, res);
        } else {
            daos.save(bgImgModel, {
                bgImgName     : bgImgName,
                bgPosition_id : bgPosition_id,
                useStatus     : useStatus,
                imgUrl        : imgUrl,
                description   : description
            }, function (err, data) {
                return result.multiReturn('保存背景图片', err, data, res, result.BGIMG_SAVE_FAILED);
            });
        }
    }).catch(function(err) {
        return result.failed(result.SERVER_ERROR, res, err.message);
    });
};

// 上传背景图片
PipeImgController.upload_bgImg = function(req, res) {
    common.upload_file(req, res, function(err, data) {
        result.multiReturn('上传图片', err, data, res);
    });
};
module.exports = PipeImgController;