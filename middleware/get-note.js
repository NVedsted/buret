const cache = require('../lib/cache');

module.exports = (request, response) => {
    response.json(cache.getNote());
};