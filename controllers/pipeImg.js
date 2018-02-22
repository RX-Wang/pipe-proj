var fs          = require('fs');
var pipeImgDao  = require("../daos/pipeImg");
var result      = require("./result");
var moment      = require("moment");
var common      = require('./common');

var PipeImgController = {};

/**
 * 保存背景图片
 * @param req
 * @param res
 * @returns {*}
 */
PipeImgController.saveImg = function (req, res) {
    var uid           = req.query.uid || req.body.uid || null;
    var startDateTime = req.query.startDateTime || req.body.startDateTime || null;
    var endDateTime   = req.query.endDateTime || req.body.endDateTime || null;
    var page          = req.body.page || req.query.page || 1;
    var PatientID     = req.body.PatientID || req.query.PatientID || 1;
    if (!uid) {
        return result.failed(result.PARAMS_ERROR, res);
    }
    
};

// 上传背景图片
PipeImgController.upload_bgImg = function(req, res) {
    common.upload_file(req, res, function(err, data) {
        result.multiReturn('上传图片', err, data, res);
    });
};
module.exports = PipeImgController;