var express = require('express');
var router = express.Router();
var WebIndexController = require('../controllers/webIndex');


/* 渲染--网站主页 */
router.get('/', WebIndexController.renderIndex);

module.exports = router;
