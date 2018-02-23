
var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
exports.schema = new Schema({
    name      : String ,//用户名
    manager_id: String ,//管理员id
    content   : String ,//操作内容
    created_at: {type: Date , default: Date.now} //操作时间
});