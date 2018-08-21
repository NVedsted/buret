const cache = require('../lib/cache');

module.exports = (request, response) => {
    const { 'params': { id } } = request;
    const classes = cache.getClasses();
    if (classes.hasOwnProperty(id)) {
        response.json(classes[id]);
    } else {
        response.status(404).end();
    }
};