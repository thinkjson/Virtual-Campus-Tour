var express = require("express");

var http = express.createServer();
http.use(express.bodyParser());
http.use(express.static(__dirname + '/static'));

var layar = require(__dirname + "/layar.js").API;
http.get('/API/POI', layar.POI);

var port = process.ARGV[2] || 80;
http.listen(port);
console.log("Listening on port " + port);