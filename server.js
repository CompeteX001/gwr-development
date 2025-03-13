const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, appName, mobile } = req.body;
    console.log(`Received submission - Name: ${name}, App Name: ${appName}, Mobile: ${mobile}`);
    
    // Here you can integrate with an SMS service to send the info to your mobile

    res.json({ message: 'Form submitted successfully!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
