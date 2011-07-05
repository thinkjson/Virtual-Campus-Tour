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
        lat: 29.034986077756262,
        lon: -81.3030606508255,
        imageURL: 'http://www.virtualcampustour.org/images/info.png',
        line2: "HR, Finance, Bursar's Office",
        line3: 'Mathematics, Computer Science',
        line4: '',
        actions: [],
        type: 0
    },
    
    'library': {
        attribution: 'The Library',
        title: 'The DuPont-Ball Library',
        lat: 29.03499076799295,
        lon: -81.3021594285965,
        imageURL: 'http://www.virtualcampustour.org/images/info.png',
        line2: 'Media services',
        line3: '',
        line4: '',
        actions: [],
        type: 0
    },
    
    'devops': {
        attribution: 'Where the Magic happens (TM)',
        title: 'Development Operations',
        lat: 29.034418557544075,
        lon: -81.30106508731842,
        imageURL: 'http://www.virtualcampustour.org/images/info.png',
        line2: 'Development Operations',
        line3: '',
        line4: '',
        actions: [],
        type: 0
    }
};