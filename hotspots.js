/**
 * These are the hotspots which will appear in the application.
 * If you wish to add additional POI, this is the place to do it.
 * 
 * Eventually this will be in the DB, and allow for multitenancy.
 * This is only a proof-of-concept at the moment, though.
 */
exports.hotspots = {
    'elizabeth_hall': {
        attribution: 'Administrative offices, Arts & Sciences',
        title: 'Elizabeth Hall',
        lat: 29.034981,
        lon: -81.303069,
        imageURL: 'http://www.virtualcampustour.org/images/info.png',
        line2: "HR, Finance, Bursar's Office",
        line3: 'Mathematics, Computer Science',
        actions: [],
        type: 0
    }
};