const cache = require('../lib/cache');

module.exports = async(request, response) => {
    const { 'params': { id } } = request;
    const classes = await cache.getClasses();
    if (classes.hasOwnProperty(id)) {
        response.json(classes[id]);
    } else {
        response.status(404).end();
    }
};