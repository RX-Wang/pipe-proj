/**
 * Created by gopain on 15/11/26.
 */

var mongoose = require("mongoose");
var config = require("../config");
var path = require("path");
var fs = require("fs");

/**
 * mongodb数据库连接
 */
mongoose.connect(
  config.db,
  {
    poolSize: 200,
    auto_reconnect: true,
    promiseLibrary: global.Promise
  },
  function(err) {
    if (err) {
      //logger.error('connect to %s error: ', config.db, err.message);
      console.log("connect to %s error: ", config.db, err.message);
      connected = false;
    } else {
      console.info("connect to %s succeed!", config.db);
      connected = true;
      var db = mongoose.connection;
      db.on("error", function(error) {
        console.error("Error in MongoDb connection: " + error);
        mongoose.disconnect();
      });
      db.on("connected", function() {
        console.log("MongoDB connected!");
      });
      db.once("open", function() {
        console.log("MongoDB connection opened!");
      });
      db.on("reconnected", function() {
        console.log("MongoDB reconnected!");
      });
      db.on("disconnected", function() {
        console.log("MongoDB disconnected!");
        mongoose.connect(config.db, {
          server: { poolSize: 200, auto_reconnect: true }
        });
      });
    }
  }
);

exports.getModel = function(name) {
  var file = path.join(__dirname, name + ".js");

  //noinspection JSUnresolvedFunction
  if (fs.existsSync(file)) {
    var schema = require(file).schema;
    if (schema) {
      return mongoose.model(name, schema);
    } else {
      console.warn("NO Schema");
    }
  }

  return undefined;
};

var connected = (exports.connected = false);