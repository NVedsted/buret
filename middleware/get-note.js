const cache = require('../lib/cache');

module.exports = async(_, response) => {
    response.json(await cache.getNote());
};