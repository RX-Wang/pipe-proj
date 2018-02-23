var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * 管理员
 */
exports.schema = new Schema({
    name                    : String , // 用户名
    password                : String , // 密码
    temp_code               : String ,
    nickname                : String ,
    phone                   : String ,//手机号,用于重置密码
    password_text           : String ,
    level                   : Number ,//级别
    group                   : [String] ,//id
    group_name              : [String] ,//name
    confirm                 : String ,//登陆确认信息
    created_at              : {type: Date , default: Date.now} ,
    updated_at              : {type: Date , default: null}
});