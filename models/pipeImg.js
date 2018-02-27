var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * 医院数据
 */
exports.schema = new Schema({
    imgType             : String, //图片类型：1：主页背景图；2：关于我们；3：博客
    useStatus           : String, //使用状态 0：禁用；1:启用
    ingUrl              : String, //图片链接
    created_at          : String, //创建时间
    deleted_at          : String, //是否删除
    updated_at          : String //更新时间
});