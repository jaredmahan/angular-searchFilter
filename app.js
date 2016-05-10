"use strict"

const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      express      = require('express'),
      exphbs       = require('express-handlebars'),
      env          = process.env;

var app = express();
var publicPath = path.join(__dirname, 'public');
var port = env.NODE_PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
    res.render('home', { root: publicPath });
});
app.get('/health', function(req, res) {
   res.writeHead(200, {'Content-Type': 'text/event-stream'});
   res.end();
});


app.listen(port, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started on port ${port}...`);
});
