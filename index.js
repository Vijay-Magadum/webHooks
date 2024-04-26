const express = require('express');
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
app.post('/webhooks/stream/custom-commands', (req, res) => {
    const actionType = req.query.type;
    if (actionType === 'rfis') {
         const responseMessage = {
            text: "Here's your BIM360 link: https://www.autodesk.com/bim-360/",
            
        };
        console.log("Action Type Received: ", actionType);
        // Respond to the chat with the desired action
    }
    res.status(200).send("BIM360 link has been sent");
});




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
