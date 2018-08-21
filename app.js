const express = require('express');
const app = express();

const getClasses = require('./middleware/get-classes');
const getClass = require('./middleware/get-class');
const getNote = require('./middleware/get-note');
const postSubscribe = require('./middleware/post-subscribe');
const postUnsubscribe = require('./middleware/post-unsubscribe');
const postTest = require('./middleware/post-test');

app.post('/subscribe', postSubscribe);
app.post('/unsubscribe', postUnsubscribe);
app.post('/test', postTest);
app.get('/note', getNote);
app.get('/classes', getClasses);
app.get('/classes/:id', getClass);

app.use(express.static('static'));

app.listen(process.env.PORT || 8080);
