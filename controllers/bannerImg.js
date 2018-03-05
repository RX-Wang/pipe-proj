var Promise      = require('bluebird');
var daos         = require("../daos");
var result       = require("./result");
var common       = require('./common');
var bannerImgModel = require('../models').getModel('bannerImg');

var BannerImgController = {};

/**
 * 渲染banner图管理首页
 * @param req
 * @param res
 */
BannerImgController.renderIndex = function (req, res) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var sort = req.query.sort || { created_at: -1 };
    daos.list(bannerImgModel, { deleted_at: null }, page, limit, sort, function (err, datas) {
        try {
            datas.items = common.formatTime(datas.items, { created_at: 'YYYY-MM-DD'});
            res.render('bannerImg/index', { data: datas });
        } catch (e) {
            return result.failed(result.SERVER_ERROR, res, e.message);
        }
    });
};
/**
 *  管理后台--背景图片管理 添加、编辑、详情页
 * @param req
 * @param res
 */
BannerImgController.renderAddEdit = function (req, res) {
    var type = req.params.type;
    var id   = req.query._bi;
    var data = { editType: type };
    if(type === 'add') {
        res.render('bannerImg/add_or_edit', { data: data });
    } else if(type !== 'add' && id) {
        daos.findOneById(bannerImgModel, id, function (err, banner) {
           if(err) {
               res.render('error-500', { error: err });
           } else {
               var d = Object.assign({}, data, banner._doc);
               res.render('bannerImg/add_or_edit', { data: d });
           }
        });
    } else
        result.failed(result.PARAMS_ERROR, res);
};
/**
 * 保存banner图
 * @param req
 * @param res
 * @returns {*}
 */
BannerImgController.addBannerImg = function (req, res) {
    var bannerImgName = req.body.bannerImgName || null;
    var useStatus     = req.body.useStatus || '1';
    var imgUrl        = req.body.imgUrl || null;
    var description   = req.body.description;
    var editType      = req.body.editType;
    var _id           = req.body._id;
    if (!bannerImgName || !useStatus || !imgUrl) {
        return result.failed(result.PARAMS_ERROR, res);
    }
    new Promise(function(reso, rej) {
        daos.findOneByOps(bannerImgModel, { bannerImgName: bannerImgName}, function(err, bannerImg) {
            if(err) {
                return rej(err);
            }
            return reso(bannerImg);
        })
    }).then(function(bannerImg) {
        if(bannerImg && editType === 'add') {
            return result.failed(result.BGNAME_DUPLICATED, res);
        } else if(editType === 'add') {
            daos.save(bannerImgModel, {
                bannerImgName : bannerImgName,
                useStatus     : useStatus,
                imgUrl        : imgUrl,
                description   : description
            }, function (err, data) {
                return result.multiReturn('保存banner图', err, data, res, result.BANNERIMG_SAVE_FAILED);
            })
        } else {
            daos.updateById(bannerImgModel, _id,{
                bannerImgName : bannerImgName,
                useStatus     : useStatus,
                imgUrl        : imgUrl,
                description   : description
            }, function (err, data) {
                return result.multiReturn('保存banner图', err, data, res, result.BANNERIMG_SAVE_FAILED);
            });
        }
    }).catch(function(err) {
        res.render('error-500', { error: err });
    });
};

/**
 * 删除 Banner 图
 * @param req
 * @param res
 */
BannerImgController.deleteBannerImg = function (req, res) {
    var _id = req.body._id || '';
    if(!_id)
        return result.failed(result.PARAMS_ERROR, res);
    else {
        daos.updateById(bannerImgModel, _id, {
            $set: { deleted_at: Date.now()}
        }, function (err, data) {
            return result.multiReturn('删除banner图', err, data, res, result.DELETE_BANNER_FAILED);
        })
    }
};

/**
 * 修改 banner 启用状态
 * @param req
 * @param res
 */
BannerImgController.change_bannerStatus = function (req, res) {
    var _id = req.body._id || '';
    var useStatus = req.body.useStatus || '';
    if(!_id || !useStatus)
        return result.failed(result.PARAMS_ERROR, res);
    else {
        daos.updateById(bannerImgModel, _id, { $set: { useStatus: useStatus }}, function (err, updated) {
            return result.multiReturn('修改banner图启用状态', err, updated, res, result.BANNERIMG_USESTATUS_UPDATE_FAILED);
        })
    }
};

/**
 * 判断 banner 名字 唯一
 * @param req
 * @param res
 */
BannerImgController.bannerNameUnique = function (req, res) {
    var bannerImgName = req.body.bannerImgName || '';
    if(!bannerImgName)
        return result.failed(result.PARAMS_ERROR, res);
    daos.findOneByOps(bannerImgModel, { bannerImgName: bannerImgName }, function (err, banner) {
        if(err) {
            return result.failed(result.SERVER_ERROR, res);
        } else if(banner) {
            return result.failed(result.BGNAME_DUPLICATED, res);
        } else {
            return result.success({}, res);
        }
    })
};

// 上传banner图
BannerImgController.upload_bannerImg = function(req, res) {
    common.upload_file(req, res, function(err, data) {
        result.multiReturn('上传图片', err, data, res);
    });
};
module.exports = BannerImgController;