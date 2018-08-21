const cache = require('../lib/cache');

module.exports = (request, response) => {
    const classes = cache.getClasses();
    if (!classes) {
        response.status(503).end('Caching in progress.');
    } else {
        response.json(Object.values(classes));
    }
};