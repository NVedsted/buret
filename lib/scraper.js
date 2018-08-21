const cheerio = require('cheerio');

/**
 * Scrapes the body HTML.
 *
 * @param {string} body
 * @returns {{classes: Object, note: string}}
 */
function scrape(body) {
    const $ = cheerio.load(body, {
        'normalizeWhitespace': true
    });

    const classes = {};
    $('.state').each((i, el) => {
        const e = $(el);
        e.removeClass('state');
        let status = 'unknown';
        const states = ['red', 'yellow', 'green'];
        for (const state of states) {
            if (e.hasClass(state)) {
                status = state;
                e.removeClass(state);
            }
        }
        const id = e.attr('class').trim();
        classes[id] = {
            'name': e.text().trim(),
            id,
            status,
        };
    });

    return {
        classes,
        'note': $('#note').text().trim(),
    };
}

module.exports = scrape;
