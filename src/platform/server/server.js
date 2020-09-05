'use strict';
var origin;
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
    origin = 'http://localhost:3000'
}
if (process.env.node_ENV === 'production') {
    origin = 'https://localhost:5000' // TODO: configure AWS Lightsail
}
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// MongoDB connection URL
const URL = require('./constants/URL');
// Import routes
const auth = require('./routes/auth');
const dashboard = require('./routes/dashboard');
// trust first proxy
app.set('trust proxy', 1)

// Mount middleware
app.use(cors({
    credentials: true,
    origin: origin
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Set up routes
app.use('/auth', auth);
app.use('/dashboard', dashboard);

// Set up connection to MongoDB
(async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
    console.log('server.js: connected to MongoDB.')
    // Listen on PORT
    app.listen(process.env.PORT, () => {
        console.log(`server.js: listening on PORT ${process.env.PORT}.`);
    });
})();

[`SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, () => {
        try {
            mongoose.disconnect();
        } catch (err) {
            if (err) {
                console.log(err);
            }
        }
        console.log('server.js: successfuly performed cleanup.');
        process.exit();
    });
});

