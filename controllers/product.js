var productModel = require('../models').getModel('product');
var daos         = require('../daos');
var result       = require('./result');
var common       = require('./common');
var Promise      = require('bluebird');

var ProductController = {};

/**
 *  管理后台--产品中心管理 首页
 * @param req
 * @param res
 */
ProductController.renderProduct = function (req, res) {
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var sort = req.query.sort || { created_at: -1 };
    daos.list(productModel, { deleted_at: null }, page, limit, sort, function (err, datas) {
        try {
            datas.items = common.formatTime(datas.items, { created_at: 'YYYY-MM-DD'});
            res.render('management/product/index', { data: datas });
        } catch (e) {
            return result.failed(result.SERVER_ERROR, res, e.message);
        }
    });
};

/**
 * 管理后台--产品添加、编辑、详情页
 * @param req
 * @param res
 */
ProductController.renderAddEdit = function (req, res) {
    var type = req.params.type;
    var id   = req.query._pi;
    var data = { editType: type };
    if(type === 'add') {
        res.render('management/product/add_or_edit', { data: data });
    } else if(type !== 'add' && id) {
        daos.findOneById(productModel, id, function (err, product) {
            if(err) {
                res.render('error-500', { error: err });
            } else {
                var d = Object.assign({}, data, product._doc);
                res.render('management/product/add_or_edit', { data: d });
            }
        });
    } else
        result.failed(result.PARAMS_ERROR, res);
};

module.exports = ProductController;