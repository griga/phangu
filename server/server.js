var express = require('express'),
    app = express();


var env = process.env.OPENSHIFT_NODEJS_PORT ? 'production' : 'development',
    config = require('./config/config')[env];

require('./config/express')(app, config);

var server = app.listen(config.port, config.host, function () {
    console.log('Phangu started on: ' + config.port);
});
