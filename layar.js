var hotspots = require(__dirname + '/hotspots.js').hotspots;
var _ = require(__dirname + '/underscore.js');

exports.API = {
    POI: function(req, res) {
        var POI = _.map(hotspots, function(obj, key) {
            obj.distance = 0; // FIXME - calculate this
            obj.id = key;
            return obj;
        });
        
        _.select(POI, function(obj) {
            // Remove hotspots that are not in range
            return true;
        });
        
        var response = {
            layer: "virtualcampustour",
            errorCode: 0,
            errorString: '',
            hotspots: POI
        };
        
        if (POI.length === 0) {
            response.errorCode = 20;
            response.errorString = "No POI found. Are you on campus?";
        }
        
        res.send(response);
    },
    
    detail: function(req, res) {
        // Show POI detail here
    }
};