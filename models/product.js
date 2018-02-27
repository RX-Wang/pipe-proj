var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

/**
 * 管业 产品
 */
exports.schema = new Schema({
    productName : String,  // 产品名称
    showStatus  : String, // 使用状态 0：不展示；1: 展示
    description : String, // 产品简介
    indexImg    : Object, // 用于在首位展示的图片，格式：{ imgPath: XXXX, imgOriginalName: XXX, imgName(序列化后的名字): XXX}
    productImgs : Object, // 产品的示例图片，格式：{ 图片名称(序列化后的名字):{ imgPath: XXX, imgName: XXX, useStatus: XXX } }
    created_at  : { type: Date, default: Date.now}, // 创建时间
    updated_at  : Date, // 更新时间
    deleted_at  : Date // 是否删除
});