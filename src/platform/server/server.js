'use strict';
if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// MongoDB connection URL
const URL = require('./constants/URL');
// Import routes
const auth = require('./routes/auth');

// trust first proxy
app.set('trust proxy', 1)

// Mount middleware
app.use(express.urlencoded({
    extended: true
}));

// Set up routes
app.use('/auth', auth);

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

