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

//let server = http.createServer(function (req, res) {
//   let url = req.url;
//   if (url == '/') {
//     url += 'index.html';
//   }

//   IMPORTANT: Your application HAS to respond to GET /health with status 200
//              for OpenShift health monitoring

 //if (url == '/health') {
//   res.writeHead(200);
//     res.end();
//   } else if (url.indexOf('/info/') == 0) {
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Cache-Control', 'no-cache, no-store');
//     res.end(JSON.stringify(sysInfo[url.slice(6)]()));
//   } else {
//     fs.readFile('./static' + url, function (err, data) {
//       if (err) {
//         res.writeHead(404);
//         res.end();
//       } else {
//         let ext = path.extname(url).slice(1);
//         res.setHeader('Content-Type', contentTypes[ext]);
//         if (ext === 'html') {
//           res.setHeader('Cache-Control', 'no-cache, no-store');
//         }
//         res.end(data);
//       }
//     });
//   }
// });

var port = env.NODE_PORT || 3000;
app.listen(port, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started on port ${port}...`);
});
