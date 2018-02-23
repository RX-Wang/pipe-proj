exports.save = function(model, params, cb) {
  var instance = new model(params);
  instance.save(cb);
};

exports.findByOpsSort = function (model , ops , sort , fn) {
  model.find(ops).sort(sort || {created_at : -1} ).exec(fn);
};

exports.findByOps = function (model , ops , fn) {
    model.find(ops , fn);
};

exports.findOneById = function (model , id , fn) {
  model.findOne({_id: id} , fn);
};

exports.findByArr = function (model , id , fn) {
  model.find({"group": id} , fn);
};

exports.findOneByOps = function (model , ops , fn) {
  model.findOne(ops , fn);
};
exports.delById      = function (model , id , fn) {
  model.remove({_id: id} , fn);
};

exports.delByOpts = function (model , opts , fn) {
  model.remove(opts , fn);
};

exports.updateByOps = function (model , ops , sets , fn) {
  model.update(ops , sets , {multi: true} , fn);
};

exports.updateByOpsNoMulti = function (model , ops , sets , fn) {
  model.update(ops , sets , fn);
};

exports.updateById = function (model , id , sets , fn) {
  model.update({_id: id} , sets , {multi: true} , fn);
};

exports.updateByOpts = function (model , opts , values , fn) {
  model.update(opts , values , fn);
};

exports.count = function (model , ops , fn) {
  model.count(ops , fn);
};

exports.saveOrUpdateByOpts = function (model , opts , values , fn) {
  model.findOneAndUpdate(opts , values , { upsert: true , new: false } , fn);
};

exports.list = function (model , ops , page , limit , sort , fn) {
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
  model.count(ops , function (err , count) {
      page_info.count = limit >= 0 ? Math.ceil(count / limit) : 1;
      proxy.trigger('page_info' , page_info);
  });

  if (!sort) {
      sort = {weight: -1};
  }
  model.find(ops).sort(sort).skip(skip).limit(limit).exec(function (err , items) {
      proxy.trigger('items' , items);
  });
};

exports.format = function (item) {
  if (item) {
      var res_item = {};
      for (var i in item) {
          if (item[i] instanceof Date) {
              res_item[i] = moment(item[i]).format('YYYY-MM-DD HH:mm:ss');
          } else {
              res_item[i] = item[i];
          }
      }
      return res_item;
  } else {
      return {};
  }
};