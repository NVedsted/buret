const subscription = require('../lib/subscriptions');

module.exports = (request, response) => {
    const { 'query': {
        endpoint,
        auth,
        p256dh,
        notes = 'false',
        classes = '',
    } } = request;

    if (!endpoint || !auth || !p256dh) {
        response.status(400).end('You must provide endpoint, auth, and p256dh.');
    }

    subscription.subscribe(endpoint, auth, p256dh, notes === 'true', classes.split(','));
    console.log("New subscription added.");
    response.status(200).end();
};