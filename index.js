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
    const { type, message } = req.body; // Simplified payload handling for demonstration
    
    // Log the received webhook for debugging
    console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  
    // Check if the message includes 'thank you'
    if (type === 'message.new' && message?.text.toLowerCase().includes('thank you')) {
      console.log('Welcome! A user said thank you.');
      // Here you might integrate with GetStream to send a message back or handle differently
    }
  
    res.status(200).send('OK');
  });





const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});
