const axios = require('axios');
const scraper = require('./scraper');
const subscription = require('./subscriptions');
const cache = require('./cache');

let updating = false;

async function startUpdate() {
    if (updating) {
        console.log("[CACHE] Update already in progres... Skipping.");
        return;
    }
    updating = true;

    console.log('[CACHE] Fetching burtavle...');
    try {
        const { data } = await axios('https://matfystutor.dk/burtavle/frame/');
        const { 'note': scrapedNote, 'classes': scrapedClasses } = scraper(data);

        const updates = [];

        if (scrapedNote !== await cache.getNote()) {
            updates.push({
                'type': 'NOTE',
                'note': scrapedNote,
            });
        }

        const classes = await cache.getClasses();

        for (const id in scrapedClasses) {
            if (!scrapedClasses.hasOwnProperty(id)) {
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
        await cache.setNote(scrapedNote);
        await cache.setClasses(scrapedClasses);

        if (updates.length > 0) {
            console.log('[CACHE] Broadcasting changes...');
            await subscription.broadcast(updates);
        }
        console.log('[CACHE] Done with update.');
        updating = false;
    } catch (e) {
        console.error("Error occured while updating: ", e);
    }
    setTimeout(startUpdate, 30 * 1000);
}

module.exports = startUpdate;
