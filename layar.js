var hotspots = require(__dirname + '/hotspots.js').hotspots;
var log = require(__dirname + '/logging.js');
var _ = require(__dirname + '/underscore.js');

// Conversion to radians
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    };
}

// API definition
exports.API = {
    POI: function(req, res) {
        // Make sure the information we need is in the request
        if (req.query.lat === undefined || req.query.lon === undefined 
                || req.query.radius === undefined) {
            res.send({
                layer: "virtualcampustour",
                errorCode: 21,
                errorString: 'Some required information was missing',
                hotspots: []
            });
            return;
        }
        
        // Gather the information we need to calculate distance
        var user = {
            lat: parseFloat(req.query.lat),
            lon: parseFloat(req.query.lon),
            radius: parseInt(req.query.radius),
            timestamp: new Date() 
        };
        
        // Log request
        log.write(JSON.stringify({
            coordinates: user.lat + "," + user.lon,
            radius: user.radius,
            request: req.originalUrl,
            user_agent: req.headers['user-agent']
        }));
        
        // Calculate the distance to each POI
        var POI = [];
        _.each(hotspots, function(val, key) {
            // Create a clone
            var obj = _.clone(val);
            
            // Calculate the distance using the Haversine formula
            var R = 6371;
            var dLat = (obj.lat-user.lat).toRad();
            var dLon = (obj.lon-user.lon).toRad();
            var lat1 = user.lat.toRad();
            var lat2 = obj.lat.toRad();

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            obj.distance = parseInt(R * c * 1000, 10);
            
            // Put the latitude and longitude in a form Layar can read
            obj.lat = parseInt(obj.lat * 1000000, 10);
            obj.lon = parseInt(obj.lon * 1000000, 10);
            
            // Attach the ID to the POI object for reference
            obj.id = key;
            
            POI.push(obj);
        });
        
        // Remove hotspots that are not in range
        POI = _.select(POI, function(obj) {
            return obj.distance < user.radius;
        });
        
        // Prepare the response
        var response = {
            layer: "virtualcampustour",
            errorCode: 0,
            errorString: '',
            hotspots: POI
        };
        
        // Throw an error if no POI are found
        if (POI.length === 0) {
            response.errorCode = 20;
            response.errorString = "No POI found. Are you on campus?";
        }
        
        // Send the response
        res.send(response);
    },
    
    detail: function(req, res) {
        // Show POI detail here
    }
};