var mongo = {
  "hostname": "localhost" ,
  "port"    : 27017 ,
  // "username": "pipe_proj" ,
  // "password": "pipe_proj" ,
  "name"    : "" ,
  "db"      : "pipe_proj"
};
var generate_mongo_url = function (obj) {
  obj.hostname = (obj.hostname || 'localhost');
  obj.port     = (obj.port || 27017);
  obj.db       = (obj.db || 'test');
  if (obj.username && obj.password) {
    return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
  } else {
    return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
  }
};
module.exports = {
    db: generate_mongo_url(mongo),
    port: 3001,
    settings: {
        cookie_encrypt_secret   : 'pipe_wanTong',
        cookie_name             : 'wanTongGuanYe',
        company_name            : '万通管业',
        company_full_name       : '招远万通管业有限公司',
        webRoot                 : 'http://localhost:3001' // 本地环境
        // webRoot                 : 'http://XXX:3001', // 正式环境
    }
};