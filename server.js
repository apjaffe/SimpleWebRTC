// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    https = require('https'),
    http = require('http');


var privateKey = fs.readFileSync('fakekeys/privatekey.pem').toString(),
    certificate = fs.readFileSync('fakekeys/certificate.pem').toString();


var app = express();

var props = {};

app.use(express.static(__dirname));
app.get('/g', function(req, res) {
  res.send(props[req.query.k]);
});
app.get('/s', function(req, res) {
  props[req.query.k] = req.query.v;
  res.send(req.query.v);
});

https.createServer({key: privateKey, cert: certificate}, app).listen(443);
//http.createServer(app).listen(80);

console.log('running on https://localhost:8000 and http://localhost:8001');
