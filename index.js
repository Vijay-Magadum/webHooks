const express = require('express');
const StreamChat = require('stream-chat').StreamChat;
require('dotenv').config();

const client = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_API_SECRET);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Request from server');
});
app.get('/home', (req, res) => {
    res.send('Request from home server');
});

app.post('/webhook', (req, res) => {
    const { type, message } = req.body;
    if (type === 'message.new' && message.text.trim() === '/rfi') {
        // Additional logic needed to send response message to the channel
        console.log("Received /rfi command");
    }
    res.status(200).send('Event received');
});

app.post('/webhooks/stream/custom-commands', async (req, res) => {
    const { message, user, form_data } = req.body;
    const cid = message.cid;
    const type = cid.split(":")[0];
    const channel_id = cid.split(":")[1];

    if (message.command === 'rfis') {

        const channel = client.channel(type, channel_id);
        try {
          const responseMessage = await channel.sendMessage({
                text: `Ticket created: ${message.args} by ${user.Custom.name}`,
                user_id: 'CustomBot' // Assuming the ID of the bot or system user that sends messages
            });

            // If you want to modify the original message, specify the changes here.
            // Remember only certain fields of the message can be modified as per Stream's documentation.
            const modifiedMessage = {
                ...message,
                text: `Processed ${message.command}: ${message.args}`
            };

            res.status(200).json(modifiedMessage);

        } catch (error) {
            console.error("Failed to send message:", error);
            res.status(500).send("Failed to process request");
        }
    } else {
        res.status(400).send("Unsupported command");
    }
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
