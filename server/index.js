const express = require('express');
const app = express();
require("dotenv").config()
const { sendNotification } = require('./fcm');

app.use(express.json());

app.get("/", (req, res) => {
    res.send('API is running');
})
app.post('/send-notification', async (req, res) => {
    const { deviceToken, title, body } = req.body;

    try {
        await sendNotification(deviceToken, title, body);
        res.status(200).send({ success: true, message: 'Notification sent successfully!' });
    } catch (error) {
        res.status(500).send({ success: false, message: 'Error sending notification', error });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
