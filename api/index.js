require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
       .then(res => {
        app.listen(4000,()=> console.log('Running on port 4000...'))
       })
       .catch(err => console.log(err))

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin : 'http://localhost:3000'
}))

app.use(userRoutes);

