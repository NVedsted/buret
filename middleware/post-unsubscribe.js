const subscription = require('../lib/subscriptions');

module.exports = async (request, response) => {
    const { 'query': {
        endpoint,
    } } = request;

    if (!endpoint) {
        response.status(400).end('You must provide endpoint.');
    }

    await subscription.unsubscribe(endpoint);
    console.log("Subscription removed.");
    response.status(200).end();
};