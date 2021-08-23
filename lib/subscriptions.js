const webpush = require('web-push');
const cache = require('./cache');


webpush.setVapidDetails(
    'mailto:nicklasvedsted@gmail.com',
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY,
);

async function subscribe(endpoint, auth, p256dh, notes, classes) {
    return cache.addSubscription(endpoint, JSON.stringify({
        auth,
        endpoint,
        p256dh,
        notes,
        classes,
    }));
}

async function unsubscribe(endpoint) {
    return cache.removeSubscription(endpoint);
}

async function broadcast(data) {
    const subs = await cache.getSubscriptions();
    let promises = [];
    for (const raw of subs) {
        const keys = JSON.parse(raw);
        const payload = data.filter(
            ((u) => (u.type === 'NOTE' && keys.notes) || (u.type === 'CLASS' && keys.classes.includes(u.id)))
        );
        if (payload.length > 0) {
            try {
                promises.push(webpush.sendNotification({
                    'endpoint': keys.endpoint,
                    keys: {
                        auth: keys.auth,
                        p256dh: keys.p256dh,
                    }
                }, JSON.stringify(payload)));
            } catch (error) {
                promises.push(cache.hdel('subs', keys.endpoint));
            }
        }
    }

    return Promise.all(promises);
}

module.exports = {
    subscribe,
    broadcast,
    unsubscribe,
};
