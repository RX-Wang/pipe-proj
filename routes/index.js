var express = require('express');
var router = express.Router();
var WebIndexController = require('../controllers/webIndex');


/* 渲染--网站主页 */
router.get('/', WebIndexController.renderIndex);

/* 渲染--产品中心 */
router.get('/gallery', WebIndexController.renderGallery);

router.get('/meituanToken', function(req, res) {
  console.log('----------', req.query.token);
  res.send(req.query.token);
})

module.exports = router;
