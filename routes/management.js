var express = require('express');
var router = express.Router();
var common = require('../controllers/common');

var PipeImgController = require('../controllers/pipeImg');
var ManagerController = require('../controllers/manager');

var path = require('path');
// 文件上传组件
var multer  = require('multer');
var upload = multer({ dest: path.join(__dirname, '../public/upload/') });

/* 管理后台首页 */
router.get('/', common.auth_user, function(req, res, next) {
  res.render('management/index');
});

/* 管理后台--背景图片管理首页 */
router.get('/bgImg', common.auth_user, PipeImgController.renderIndex);

/* 管理后台--背景图片管理 添加、编辑、详情页 */
router.get('/bgImg_add-or-edit-bgImg', common.auth_user, function(req, res, next) {
  res.render('bgImg/add_or_edit', {
    data: {
      _id: '1234567',
      bgImgName: 'Diana',
      deptName: '心内科',
      useStatus: '0',
      description: '<h1>Diana-戴安娜</h1>',
      imgUrl: 'http://c3.haibao.cn/img/300_300_100_0/yasEO0BQ0x64/celebrity/201349/yasEO0BQ0x64.png',
      editType: 'add',
      bgPasition_id: '2',
      bgPosations: [
        {
          _id: '1',
          bgPosationName: '背景图一',
        },
        {
          _id: '2',
          bgPosationName: '背景图二',
        },
        {
          _id: '3',
          bgPosationName: '背景图三',
        },
      ]
    }
  });
});

/* 管理后台--登录页面 */
router.get('/toLogin', function(req, res) {
    res.render('login', {});
});

/* API--登录 */
router.post('/login', ManagerController.login);

/* API--上传背景图片 */
router.post('/upload_bgImg', common.auth_user, upload.single('upload_file'), function(req, res) {
  PipeImgController.upload_bgImg(req, res);
});

/* API--背景图片添加接口 */
router.post('/bgImg/add', common.auth_user, PipeImgController.addImg);

router.get('/typography', common.auth_user, function(req, res, next) {
  res.render('typography', {});
});
router.get('/elements', common.auth_user, function(req, res, next) {
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
