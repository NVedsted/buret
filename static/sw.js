console.log('help');

self.addEventListener('push', function(event) {
    const updates = event.data.json();
    for (const update of updates) {
        if (update.type === 'NOTE') {
            self.registration.showNotification('New Note', {
                'body': update.note,
                'requireInteraction': true,
            });
        } else if (update.type === 'CLASS') {
            self.registration.showNotification(`${update.name} Status Change`, {
                'body': `${update.name}'s status is now ${update.status}`,
                'requireInteraction': true,
            });
        }
    }
});