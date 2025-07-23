const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
    res.send('Welcome to Budget AI Server');
});

app.get('/home', (req, res) => {
    res.send('Welcome to Budget AI Home Page');
});

app.get('/about', (req, res) => {
    res.send("This website is created By Atharv Ganmote. It is a platform to help users manage their finances effectively and efficiently. The website provides various features such as budgeting, expense tracking, and financial planning tools. The goal is to empower users to take control of their financial health and make informed decisions about their money.")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});