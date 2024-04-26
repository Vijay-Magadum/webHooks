const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const { type, message } = req.body; // Simplified payload handling for demonstration
  
  // Log the received webhook for debugging
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));

  // Check if the message includes 'thank you'
  if (type === 'message.new' && message?.text.toLowerCase().includes('/rfi\'s')) {
    console.log('sending rfi LINK');
    // Here you might integrate with GetStream to send a message back or handle differently
  }

  res.status(200).send('https://www.autodesk.com/bim-360/');
});
app.get('/',(req,res)=>{
    res.status(200).send('Heeellloo there');



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
