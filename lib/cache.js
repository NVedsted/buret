const asyncRedis = require('async-redis');

const cache = asyncRedis.createClient({
    'host': process.env.REDIS_HOST || 'localhost',
    'db': process.env.REDIS_DB
});

// TODO use hash structure
async function setClasses(classes) {
    return cache.set("classes", JSON.stringify(classes));
}

async function getClasses() {
    return JSON.parse(await cache.get("classes")) ?? {};
}

async function setNote(note) {
    return cache.set("note", note);
}

async function getNote() {
    return cache.get("note");
}

async function addSubscription(endpoint, payload) {
    return cache.hset('subs', endpoint, payload);
}

async function getSubscriptions() {
    return cache.hvals('subs');
}

async function removeSubscription(endpoint) {
    return cache.hdel('subs', endpoint);
}

async function isSubscribed(endpoint) {
    return cache.hexists('subs', endpoint);
}

module.exports = {
    setClasses,
    getClasses,
    getNote,
    setNote,
    isSubscribed,
    addSubscription,
    removeSubscription,
    getSubscriptions,
};
