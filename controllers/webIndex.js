var Promise = require('bluebird');
var common  = require('./common');
var daos    = require('../daos');
var result  = require('./result');
var bannerImgModel = require('../models').getModel('bannerImg');

var WebIndexController = {};

/**
 * 渲染--网站主页
 * @param req
 * @param res
 */
WebIndexController.renderIndex = function (req, res) {
    var banners = new Promise(function (reso, rej) {
        daos.findByOps(bannerImgModel, {
            useStatus: '1',
            deleted_at: null
        }, function (err, data) {
            if(err)
                rej(err);
            else
                reso(data);
        });
    });
    Promise.all([banners])
        .then(function (results) {
            res.render('index', { data: {
                banners: results[0]
            }});
        })
        .catch(function (err) {
            console.log(err);
            res.render('error-500', { error: err });
        });
};

/**
 * 渲染产品中心
 * @param req
 * @param res
 */
WebIndexController.renderGallery = function (req, res) {
    res.render('gallery01');
};
module.exports = WebIndexController;