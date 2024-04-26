const express = require('express');
const { StreamChat } = require('getstream');

const client = StreamChat.getInstance('fqhnt9x3puve', 'beauaenbsgfdxrfqnsp9mdhvbbxy38kun4vqbt9c3rc4drppyvrbu5tycb4v73n4');

const app =express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Request from server');
});
app.get('/home',(req,res)=>{
    res.send('Request from home server');
});

app.post('/webhook', (req, res) => {
    const { type, message } = req.body;
    if (type === 'message.new' && message.text.trim() === '/rfi') {
        // Logic to send a message back to the channel with the "BIM360" link
        const responseMessage = {
            text: "Here's your BIM360 link: https://www.autodesk.com/bim-360/",
            // Other necessary message parameters like channel_id, etc.
        };
        // Send responseMessage to the channel
    }
    res.status(200).send('Event received');
});
app.post('/webhooks/stream/custom-commands', async (req, res) => {
    const { type, channel_id } = req.query;
    if (type === 'rfis') {
        const channel = client.channel('messaging', channel_id);
        try {
            await channel.sendMessage({
                text: "Here's your BIM360 link: https://www.autodesk.com/bim-360/",
                user_id: 'CustomBot'
            });
            res.status(200).send("BIM360 link has been sent");
        } catch (error) {
            console.error("Failed to send message:", error);
            res.status(500).send("Failed to process request");
        }
    } else {
        res.status(400).send("Unsupported command");
    }
});



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
