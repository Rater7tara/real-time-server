const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// MongoDB functions



app.get('/', (req, res) => {
    res.send('real time server is running')
})

app.listen(port, () => {
    console.log(`real time Server is running on port: ${port}`)
})