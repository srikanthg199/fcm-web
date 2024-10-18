/*
In Firebase Cloud Messaging (FCM), topics allow you to send push notifications to multiple devices (users) that are subscribed to the same topic. This is especially useful when you want to send messages to a group of users who share common interests or belong to a specific group (e.g., news, sports, etc.), without managing individual device tokens manually.

Why Use Topics?
Broadcast Messaging: Send notifications to multiple users at once without needing to store and manage their device tokens individually.
Efficient Grouping: Instead of sending individual notifications, you can organize users based on topics. For example, if you have a news app, you can have topics for “sports,” “politics,” “technology,” etc.
Simplifies Notification Management: By subscribing users to topics, you can manage notifications on a group basis, making it easier to scale the messaging system.
*/

// Function to subscribe a device to a topic
exports.subscribeToTopic = async (deviceToken, topic) => {
    try {
        // Subscribe the device token to the topic
        const response = await fcm.subscribeToTopic(deviceToken, topic);
        console.log("Successfully subscribed to topic:", response);
    } catch (error) {
        console.error("Error subscribing to topic:", error);
    }
};

// Example usage
const deviceToken = "your-device-token";
const topic = "news";
subscribeToTopic(deviceToken, topic);


// Function to unsubscribe a device from a topic
exports.unsubscribeFromTopic = async (deviceToken, topic) => {
    try {
        // Unsubscribe the device token from the topic
        const response = await fcm.unsubscribeFromTopic(deviceToken, topic);
        console.log("Successfully unsubscribed from topic:", response);
    } catch (error) {
        console.error("Error unsubscribing from topic:", error);
    }
};

// Example usage
unsubscribeFromTopic(deviceToken, topic);


// Function to send a notification to a topic
exports.sendNotificationToTopic = async (topic, title, body) => {
    try {
        const message = {
            topic: topic,
            notification: {
                title: title,
                body: body,
            },
            // Optionally, you can add data
            data: {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                customKey: 'customValue',
            },
        };

        // Send the message to all devices subscribed to the topic
        const response = await fcm.send(message);
        console.log("Successfully sent message to topic:", response);
    } catch (error) {
        console.error("Error sending message to topic:", error);
    }
};

// Example usage
sendNotificationToTopic('news', 'Breaking News!', 'Here is your news update.');
