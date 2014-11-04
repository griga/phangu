var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../public'));

app.listen(4442, function(){
    console.log('phangu on ', 4442);
});