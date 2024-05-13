const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db')
const ussd = require('./ussd');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// database connection url
const db = dbConfig.mongoURI;

// Connect to the database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully Connected to the database'))
    .catch(err => console.error('There was an error connecting to MongoDB:', err));

app.get('/', (req, res) => {
    res.send("GET Request Called")
})

// app.get('/tokenCheck', mpesa.generateToken)
app.post('/ussd', ussd.initUssd);

const port = 3004;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})