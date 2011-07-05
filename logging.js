var http = require('http');
var options = {
    host: 'logs.loggly.com',
    port: 80,
    path: '/inputs/ad1f7b42-b123-44b5-8234-374ada15a044',
    method: 'POST'
};

exports.write = function(data) {
    var req = http.request(options, function(res) {});

    req.on('error', function(e) {
        console.log('Could not log request: ' + e.message);
    });

    req.write(data);
    req.end();
};