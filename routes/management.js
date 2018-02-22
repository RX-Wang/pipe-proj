var express = require('express');
var router = express.Router();
var pipeImgContr = require('../controllers/pipeImg');

/* GET management home page. */
router.get('/', function(req, res, next) {
  res.render('management/index');
});
// 背景图片管理
router.get('/bgImg', function(req, res, next) {
  res.render('bgImg/index');
});
router.get('/bgImg_add-or-edit-bgImg', function(req, res, next) {
  res.render('bgImg/add_or_edit', {
    data: {
      _id: '1234567',
      bgImgName: 'Diana',
      deptName: '心内科',
      useStatus: '0',
      description: '<h1>Diana-戴安娜</h1>',
      avatar: 'http://c3.haibao.cn/img/300_300_100_0/yasEO0BQ0x64/celebrity/201349/yasEO0BQ0x64.png',
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
router.get('/login', function(req, res, next) {
  res.render('login', {});
});
router.get('/calendar', function(req, res, next) {
  res.render('calendar', {});
});
router.get('/gallery', function(req, res, next) {
  res.render('gallery', {});
});

module.exports = router;
