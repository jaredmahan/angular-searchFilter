var express = require('express');
var app = express();
var path = __dirname + '/app/';

console.log('Path: ' + path);

var BundleUp = require('bundle-up3');
var assets = require('./assets');

BundleUp(app, assets, {
  staticRoot: __dirname + '/app/',
  staticUrlRoot: '/',
  bundle:true,
  minifyCss: true,
  minifyJs: true,
  complete: console.log.bind(console, "Bundle-up: static files are minified/ready")
});




app.use(express.static(__dirname + '/app/'));



var port = 10003;
app.listen(port, function(){
	console.log('server listening on port '  + port);
})