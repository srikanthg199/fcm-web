import { getMessaging, getToken } from "firebase/messaging";

// Initialize Firebase Messaging
const messaging = getMessaging("app");

// Request permission and get token
async function getDeviceToken () {
    try {
        const token = await getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' });
        console.log('Device Token:', token);
        return token;
    } catch (error) {
        console.error('Error getting device token:', error);
    }
}

// Example usage: Send the token to your backend to subscribe to a topic
getDeviceToken().then((token) => {
    fetch('/subscribe-to-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceToken: token, topic: 'news' })
    });
});
