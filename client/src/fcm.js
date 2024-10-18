// Import necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your Firebase config (use the one you provided)
const firebaseConfig = {
    apiKey: "AIzaSyC5wPP9vgjdin94-AgbIeuivySv2-NI5zg",
    authDomain: "global-impulse-392611.firebaseapp.com",
    projectId: "global-impulse-392611",
    storageBucket: "global-impulse-392611.appspot.com",
    messagingSenderId: "540241565639",
    appId: "1:540241565639:web:6cab3ba5ba5e8b71a4abe2",
    measurementId: "G-4M6EYP9Z56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get reference
const messaging = getMessaging(app);

// Requesting permission and getting device token
export const requestNotificationPermission = async () => {
    try {
        // Request permission from user
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            // Get device token
            const deviceToken = await getToken(messaging, { vapidKey: "BDESTbJy4nFMPoI3d0A385C5IRzB3xrvN62IZgLhrCYXpuyQr_OmpxP_ccejyyZcQobZsvgQqtcY6nLchFOL8tM" });
            console.log('Device token:', deviceToken);
            // Send the token to your server to register it
            // Use this token on the server to send push notifications
        } else {
            console.error('Notification permission denied');
        }
    } catch (error) {
        console.error('Error getting device token:', error);
    }
};

// Call the function to request permission and get the device token
// requestNotificationPermission();

// Listen for messages when the app is in the foreground
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // Customize the notification here, e.g., show it on the webpage
});


