'use strict';
const mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    // Connection code is for the C packet sniffer to connect to platform
    connectionCode: Number,
    username: String,
    password: String
});

module.exports = mongoose.model('login', loginSchema);