var hotspots = require(__dirname + '/hotspots.js').hotspots;
var _ = require(__dirname + '/underscore.js');

exports.API = {
    POI: function(req, res) {
        // Make sure the information we need is in the request
        if (req.query.lat === undefined || req.query.long === undefined 
                || req.query.radius === undefined) {
            res.send({
                layer: "virtualcampustour",
                errorCode: 21,
                errorString: 'Some required information was missing',
                hotspots: []
            });
        }
        
        // Gather the information we need to calculate distance
        var user = {
            lat: req.query.lat,
            lon: req.query.long,
            radius: req.query.radius
        };        
        
        // Calculate the distance to each POI
        var POI = _.map(hotspots, function(obj, key) {
            // Calculate the distance using the Haversine formula
            obj.distance = (((Math.acos(Math.sin((user.lat * Math.PI / 180)) 
                    * Math.sin((obj.lat * Math.PI / 180)) +
                    Math.cos((obj.lat * Math.PI / 180)) 
                    * Math.cos((obj.lat * Math.PI / 180)) * 
                    cos((user.lon  - obj.lon) * Math.PI / 180))
                   ) * 180 / Math.PI) * 60 * 1.1515 * 1.609344 * 1000);
            
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