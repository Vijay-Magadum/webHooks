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





const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
