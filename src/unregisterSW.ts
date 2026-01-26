export function unregisterSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
                registration.unregister();
                console.log('Service Worker unregistered');
            }
        });
    }
}
