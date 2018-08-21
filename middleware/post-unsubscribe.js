const subscription = require('../lib/subscriptions');

module.exports = (request, response) => {
    const { 'query': {
        endpoint,
    } } = request;

    if (!endpoint) {
        response.status(400).end('You must provide endpoint.');
    }

    subscription.unsubscribe(endpoint);
    response.status(200).end();
};