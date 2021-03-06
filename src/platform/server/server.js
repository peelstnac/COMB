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
const http = require('http').createServer(app);
const tcpServer = require('./tcpServer');
const io = require('socket.io')(http);
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
    // Start the TCP server
    tcpServer.start(io);
    // Listen on PORT
    http.listen(process.env.PORT, () => {
        console.log(`server.js: listening on PORT ${process.env.PORT}.`);
    });
})();

// Implement SocketIO handling here
io.on('connection', (socket) => {
    let secret;
    socket.on('secret', (data) => {
        secret = data;
        let { arr } = tcpServer;
        // Find the secret in the array
        var flag = false;
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].secret === secret) {
                flag = true;
                // Add the socket to the array
                // arr.socket = socket; THIS PART DOES NOT WORK, FIX BELOW

                // FIX: every socket joins their own room
                socket.join(arr[i].connectionCode.toString());
                break;
            }
        }
        // TODO handle flag === false
    });
    socket.on('disconnect', () => {
        let { arr } = tcpServer;
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i].secret === secret) {
                arr.splice(i, 1);
                break;
            }
        }
    });
});

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

