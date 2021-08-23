const express = require('express');
const app = express();

const updater = require('./lib/updater');
updater();

const getClasses = require('./middleware/get-classes');
const getClass = require('./middleware/get-class');
const getPublicKey = require('./middleware/get-public-key');
const getNote = require('./middleware/get-note');
const postSubscribe = require('./middleware/post-subscribe');
const postUnsubscribe = require('./middleware/post-unsubscribe');
const getSubscribed = require('./middleware/get-subscribed');

app.post('/subscribe', postSubscribe);
app.post('/unsubscribe', postUnsubscribe);
app.get('/subscribed', getSubscribed);
app.get('/key', getPublicKey);
app.get('/note', getNote);
app.get('/classes', getClasses);
app.get('/classes/:id', getClass);

app.use(express.static('static'));

app.listen(process.env.PORT || 8080);
