var express = require('express');
var router = express.Router();

var BannerImgController = require('../controllers/bannerImg');
var ManagerController = require('../controllers/manager');
var ProductController = require('../controllers/product');

var path = require('path');
// 文件上传组件
var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, '../public/upload/') });


/* 管理后台首页 */
router.get('/', function(req, res, next) {
  res.render('management/index');
});

                /**
                 *  ============>  管理后台--banner 相关 ---- START
                 */

/* 管理后台--banner图片管理首页 */
router.get('/bannerImg', BannerImgController.renderIndex);

/* 管理后台--banner图片管理 添加、编辑、详情页 */
router.get('/bannerImg_add-or-edit-bannerImg/:type', BannerImgController.renderAddEdit);

/* API-- 判断banner名字是否重复*/
router.post('/bannerNameUnique', BannerImgController.bannerNameUnique);

/* API--上传banner图片 */
router.post('/upload_bannerImg', upload.single('upload_file'), function(req, res) {
    BannerImgController.upload_bannerImg(req, res);
});

/* API--banner图片 添加 接口 */
router.post('/bannerImg/add', BannerImgController.addBannerImg);

/* API--banner图片 删除 接口 */
router.post('/delete_banner', BannerImgController.deleteBannerImg);

/* API--banner图片 启用状态 修改接口 */
router.post('/change_bannerStatus', BannerImgController.change_bannerStatus);

                /**
                 *  管理后台--banner 相关 ---- END  <============
                 */

                /**
                 *  ============>  管理员 账号密码 相关 ---- START
                 */

/* 管理后台--管理员账户密码管理 */
router.get('/toAddManager', function (req, res) {
   res.render('userManager');
});

// 我自己的临时添加管理员的页面
router.get('/wxqManager', function(req, res) {
    res.render('userManager/wxq_addManager');
});

// API--我自己临时的添加管理员
router.post('/wxq_addManager', ManagerController.wxq_addManager);


/* 管理后台--登录页面 */
router.get('/toLogin', function(req, res) {
    res.render('login', {});
});

/* API--登录 */
router.post('/login', ManagerController.login);

                /**
                 *  管理员 账号密码 相关 ---- END
                 */


                /**
                 *  管理后台--产品 相关 ---- START
                 */
/* 管理后台--产品中心管理 首页*/
router.get('/product', ProductController.renderProduct);

/* 管理后台--产品添加、编辑、详情页 */
router.get('/product_add-or-edit-bannerImg/:type', ProductController.renderAddEdit);

/* API-- 判断产品名字是否重复*/
router.post('/productNameUnique', ProductController.productNameUnique);

                /**
                 *  管理后台--产品 相关 ---- END
                 */

router.get('/typography', function(req, res, next) {
  res.render('typography', {});
});
router.get('/elements', function(req, res, next) {
  res.render('elements', {});
});
router.get('/buttons', function(req, res, next) {
  res.render('buttons', {});
});
router.get('/treeview', function(req, res, next) {
  res.render('treeview', {});
});
router.get('/jquery-ui', function(req, res, next) {
  res.render('jquery-ui', {});
});
router.get('/nestable-list', function(req, res, next) {
  res.render('nestable-list', {});
});
router.get('/tables', function(req, res, next) {
  res.render('tables', {});
});
router.get('/jqgrid', function(req, res, next) {
  res.render('jqgrid', {});
});
router.get('/form-elements', function(req, res, next) {
  res.render('form-elements/index', {});
});
router.get('/error-404', function(req, res, next) {
  res.render('error-404', {});
});
router.get('/error-500', function(req, res, next) {
  res.render('error-500', {});
});
router.get('/grid', function(req, res, next) {
  res.render('grid', {});
});

router.get('/calendar', function(req, res, next) {
  res.render('calendar', {});
});
router.get('/gallery', function(req, res, next) {
  res.render('gallery', {});
});

module.exports = router;
