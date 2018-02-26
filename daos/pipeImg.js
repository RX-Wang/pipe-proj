var pipeImgModel = require('../models').getModel('pipeImg');
var indexDao = require('./index');
var EventProxy = require('eventproxy').EventProxy;

exports._list = function (ops , page , limit , sort , fn) {
    limit                  = limit || 20;
    page                   = page || 1;
    var skip               = (page - 1) * limit;
    var page_info          = {};
    page_info.current_page = page;
    page_info.page_size    = limit;
    var proxy              = new EventProxy();

    var callback = function (items , page_info) {
        fn(null , {items: items , page_info: page_info});
    };

    proxy.assign('items' , 'page_info' , callback);
    reportModel.count(ops , function (err , count) {
        page_info.count = Math.ceil(count / limit);
        proxy.trigger('page_info' , page_info);
    });

    if (!sort) {
        sort = {created_at: -1};
    }
    if (!ops.deleted_at) {
        ops.deleted_at = null;
    }
    reportModel.find(ops).sort(sort).skip(skip).limit(limit).exec(function (err , items) {
        proxy.trigger('items' , items);
    });
};

exports.list = function (ops , page , limit , sort , fn) {
    this._list(ops , page , limit , sort , fn);
};

exports.removeAllById = function (pid , fn) {
  pipeImgModel.remove({PatientID: pid} , fn);
};

exports.addPipeImg = function (pipeImg , fn) {
    if (pipeImg) {
        indexDao.save(pipeImgModel, pipeImg, fn);
    } else {
        return fn('data is null');
    }
};
