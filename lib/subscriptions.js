const webpush = require('web-push');
const redis = require('redis');

const client = redis.createClient({
    'host': process.env.REDIS_HOST | 'localhost',
    'db': process.env.REDIS_DB
});


webpush.setVapidDetails(
    'mailto:nicklasvedsted@gmail.com',
    process.env.PUBLIC_KEY,
    process.env.PRIVATE_KEY,
);

const subscriptions = {};

/**
 * @param {string} endpoint
 * @param {string} auth
 * @param {string} p256dh
 * @param {boolean} notes
 * @param {[string]} classes
 */
function subscribe(endpoint, auth, p256dh, notes, classes) {
    client.hset('subs', endpoint, JSON.stringify({
        auth,
        endpoint,
        p256dh,
        notes,
        classes,
    }));
}

function unsubscribe(endpoint) {
    client.hdel('subs', endpoint);
}

function broadcast(data) {
    client.hvals('subs', (error, subs) => {
        if (error) {
            return;
        }
        for (const raw of subs) {
            const keys = JSON.parse(raw);
            const payload = data.filter(
                ((u) => (u.type === 'NOTE' && keys.notes) || (u.type === 'CLASS' && keys.classes.includes(u.id)))
            );
            if (payload.length > 0) {
                try {
                    webpush.sendNotification({
                        'endpoint': keys.endpoint,
                        keys: {
                            auth: keys.auth,
                            p256dh: keys.p256dh,
                        }
                    }, JSON.stringify(payload));
                } catch (error) {
                    client.hdel('subs', keys.endpoint);
                }
            }
        }
    });
}

module.exports = {
    subscribe,
    broadcast,
    unsubscribe,
};
