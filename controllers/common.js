var fs = require('fs');
var path = require('path');

exports.upload_file = function(req, res, cb) {
  try {
    // multer 方式上传--START   需要现在 router中进行处理
    var temp_path = req.file.path;
    var ext = '.' + req.file.originalname.split('.')[1];
    var target_path = req.file.path + ext;
    var _filename = req.file.filename + ext;
    var filePath = '/upload/' + _filename;
    console.log("Uploading: " + _filename);
    fs.rename(temp_path, target_path, function(err,data) {
      cb(null, { file_path: filePath });
    });
    // multer 方式上传--END
  } catch (e) {
    cb(e);
  }
};