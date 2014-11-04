var express = require('express');


module.exports = function(app, config){
    app.use(express.static(config.staticPath));

};