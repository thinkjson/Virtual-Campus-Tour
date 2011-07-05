var hotspots = require(__dirname + '/hotspots.js').hotspots;
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
            radius: req.query.radius
        };        
        
        // Calculate the distance to each POI
        var POI = _.map(hotspots, function(obj, key) {
            // Calculate the distance using the Haversine formula
            var R = 6371;
            var dLat = (obj.lat-user.lat).toRad();
            var dLon = (obj.lon-user.lon).toRad();
            var lat1 = user.lat.toRad();
            var lat2 = obj.lat.toRad();

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            obj.distance = R * c;
            
            // Put the latitude and longitude in a form Layar can read
            obj.lat *= 1000000;
            obj.lon *= 1000000;
            
            // Attach the ID to the POI object for reference
            obj.id = key;
            
            return obj;
        });
        
        // Remove hotspots that are not in range
        _.select(POI, function(obj) {
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