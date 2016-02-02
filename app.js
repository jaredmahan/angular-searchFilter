/*global process, __dirname */

var express = require('express');
var path = require('path');
var bundleUp = require('bundle-up3');

var port = process.env.port || 10003;
var publicPath = path.join(__dirname, 'public');
console.log('Path: ' + publicPath);

var app = express();
var assets = require('./assets');

bundleUp(app, assets, {
  staticRoot: publicPath,
  staticUrlRoot: '/',
  bundle:true,
  minifyCss: true,
  minifyJs: true,
  asyncJs: false,
  complete: console.log.bind(console, "Bundle-up: static files are minified/ready")
});

app.set('view engine', 'jade');
app.use(express.static(publicPath));

/* GET home page. */
app.get('/', function(req, res) {
    res.render('index', { title: 'Home' });
});

app.listen(port, function(){
	console.log('server listening on port '  + port);
})