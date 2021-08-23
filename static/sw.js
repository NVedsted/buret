const colorMap = {
    "green": "grøn",
    "yellow": "gul",
    "red": "rød",
};

self.addEventListener('push', function (event) {
    const updates = event.data.json();
    for (const update of updates) {
        if (update.type === 'NOTE') {
            self.registration.showNotification('Ny note på Burtavlen!', {
                'body': update.note,
                'requireInteraction': true,
            });
        } else if (update.type === 'CLASS') {
            self.registration.showNotification(`${update.name} er ${colorMap[update.status]} på Burtavlen!`, {
                'requireInteraction': true,
            });
        }
    }
});
