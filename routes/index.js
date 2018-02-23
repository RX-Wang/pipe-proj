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

module.exports = router;
