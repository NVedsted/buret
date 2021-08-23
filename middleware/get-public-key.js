const webpush = require('web-push');

module.exports = (_, response) => {
    response.json(process.env.PUBLIC_KEY);
};