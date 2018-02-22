var express = require('express');
var router = express.Router();
var PipeImgController = require('../controllers/pipeImg');

var path = require('path');
var multer  = require('multer')
var upload = multer({ dest: path.join(__dirname, '../public/upload/') });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 上传背景图片
router.post('/upload_bgImg', upload.single('upload_file'), function(req, res) {
  PipeImgController.upload_bgImg(req, res);
});
module.exports = router;
