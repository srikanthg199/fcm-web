// Import Firebase Admin SDK
const admin = require("firebase-admin");

// service account key JSON file: Will get from firebase => project settings/Service accounts
// var serviceAccount = require("./global-impulse-392611-firebase-adminsdk-a3ft5-ecaf99dd5f.json");
var serviceAccount = {
    "type": process.env.FCM_PROJECT_TYPE,
    "project_id": process.env.FCM_PROJECT_ID,
    "private_key_id": process.env.FCM_PRIVATE_KEY_ID,
    "private_key": process.env.FCM_PRIVATE_KEY,
    "client_email": process.env.FCM_CLIENT_EMAIL,
    "client_id": process.env.FCM_CLIENT_ID,
    "auth_uri": process.env.FCM_AUTH_URI,
    "token_uri": process.env.FCM_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.FCM_AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.FCM_CLIENT_X509_CERT_URL,
    "universe_domain": process.env.FCM_UNIVERSE_DOMAIN
};


// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Reference to the Firebase Cloud Messaging service
const fcm = admin.messaging();

// Function to send a push notification
exports.sendNotification = async (deviceToken, title, body) => {
    try {
        const message = {
            token: deviceToken,
            notification: {
                title: title,
                body: body,
            },
            // Optionally, you can send additional data
            data: {
                click_action: '', // For web push
                customKey: 'customValue',
            },
        };

        // Send a message to the device corresponding to the provided token.
        const response = await fcm.send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

// Example of sending a notification
// const exampleDeviceToken = "DEVICE_TOKEN_RECEIVED_FROM_CLIENT";
// sendNotification(exampleDeviceToken, "Hello!", "This is a test notification.");
