const axios = require('axios');
const scraper = require('./scraper');
const subscription = require('./subscriptions');

let classes = {};
let note = null;

let previousBody = '';

/**
 * Get the classes.
 * @returns {Object}
 */
function getClasses() {
    return classes;
}

/**
 * Get the note.
 * @returns {string}
 */
function getNote() {
    return note;
}

async function startUpdate() {
    console.log('Fetching burtavle...');
    try {
        const { data } = await axios('https://matfystutor.dk/burtavle/frame/');
        if (data !== previousBody) {
            previousBody = data;
            console.log('Parsing body...');
            const { 'note': scrapedNote, 'classes': scrapedClasses } = scraper(data);
            const updates = [];
            if (scrapedNote !== note) {
                updates.push({
                    'type': 'NOTE',
                    'note': scrapedNote,
                });
            }

            for (const id in scrapedClasses) {
                if(!scrapedClasses.hasOwnProperty(id)) {
                    continue;
                }
                const oldClass = classes[id];
                const newClass = scrapedClasses[id];

                if (!oldClass || newClass.status !== oldClass.status) {
                    updates.push({
                        'type': 'CLASS',
                        id,
                        'name': newClass.name,
                        'status': newClass.status,
                    });
                }
            }

            if(updates.length > 0) {
                subscription.broadcast(updates);
            }
            note = scrapedNote;
            classes = scrapedClasses;
            console.log('Done.');
        } else {
            console.log('No changes. Done.');
        }
    } catch (e) {
        console.log(e);
    }
    setTimeout(startUpdate, 30 * 1000);
}

startUpdate();

module.exports = {
    getClasses,
    getNote,
    startUpdate,
};
