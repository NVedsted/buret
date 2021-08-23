const cache = require('../lib/cache');

module.exports = async(request, response) => {
    const classes = await cache.getClasses();
    if (!classes) {
        response.status(503).end('Caching in progress.');
    } else {
        response.json(Object.values(classes));
    }
};