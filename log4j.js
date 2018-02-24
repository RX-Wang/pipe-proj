var path = require('path');

module.exports = {
    "appenders": [
        {"type": "console"},
        {
            "type": "dateFile",
            "filename": path.join(__dirname,"/logs/"),
            "pattern": "yyyy-MM-dd-hh.log",
            "maxLogSize": 100 * 1024 * 1024,
            "absolute": false,
            "alwaysIncludePattern": true,
            "category": "console"
        } ],
    "replaceConsole": true,
    "lineDebug"     : true
};