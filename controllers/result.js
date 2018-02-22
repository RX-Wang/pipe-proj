var Result   = {};
var code_msg = {code: 'msg'};


Result.multiReturn = function (action,err,data,res,code) {
  if(err){
      console.log(action + '--失败--',err.message || '未知失败');
      return this.failed(code,res);
  }else if(data && !data.upserted && data.nModified && data.nModified !== 1){
      console.log(action + '--失败--',JSON.stringify(data));
      return this.failed(code,res);
  }else{
      console.log(action + '--成功');
      return this.success(data || {},res);
  }

};

/**
 * 请求成功，但是操作失败，json数据
 * @param code 错误码
 * @param msg 错误信息
 * @param res
 * @returns {*}
 */
Result.failed = function (code , res , msg) {
    var err_code = Result[code] ? Result[code] + ":" + code_msg[code] : '';
    var json = {
        code: code ,
        data: null ,
        msg : code_msg[code] || msg || '操作失败'
    };
    console.log(JSON.stringify(json));
    return res.json(json);
};

/**
 * 操作成功返回，json数据
 * @param data
 * @param res
 * @returns {*}
 */
Result.success = function (data , res , msg) {
    var json = {
        code: '200' ,
        data: data ,
        msg : msg || '操作成功'
    };
    return res.json(json);
};
/**
 *
 * @param view
 * @param data
 * @param res
 * @returns {*}
 */
Result.render = function (view , data , res) {
    if (!data.title) {
        data.title = '掌上医院管理';
    }
    if (!data.pre_nav) {
        data.pre_nav = '首页';
    }
    if (!data.cur_nav) {
        data.cur_nav = '#';
    }
    if (!data.pre_nav_url) {
        data.pre_nav_url = '/';
    }
    return res.render(view , data);
};

/**
 * 错误码信息
 * @param res
 * @returns {*}
 */
Result.info = function (res) {
    var msgs = {};
    for (var i in code_msg) {
        if (code_msg[i]) {
            msgs[i] = code_msg[i];
        }
    }
    return res.json(msgs);
};
Result.SCHEDULE_NOT_EXIST                = '10007';
code_msg[Result.SCHEDULE_NOT_EXIST]      = '挂号信息不存在';

module.exports = Result;