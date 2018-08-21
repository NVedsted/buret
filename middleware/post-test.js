const cache = require('../lib/cache');

module.exports = (request, response) => {
    cache.startUpdate();
    response.end();
};