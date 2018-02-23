var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * 背景图片
 */
exports.schema = new Schema({
    bgImgName      : String, // 图片名称
    bgPosition_id  : String, //图片展示位置：1：主页背景图；2：关于我们；3：博客
    bgPosationName : String, // 位置名称
    useStatus      : String, //使用状态 0：禁用；1:启用
    imgUrl         : String, //图片链接  图片比例：1280 * 400
    description    : String, // 图片描述
    created_at     : {type: Date , default: Date.now}, //创建时间
    updated_at     : {type: Date , default: null}, //更新时间
    deleted_at     : {type: Date , default: null} //是否删除
});