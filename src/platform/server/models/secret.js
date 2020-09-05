const mongoose = require('mongoose');

/*
Whenever client requests data stream from server with connection code, auth route checks if authenticated for that code,
then if client is authenticated, a secret is sent throught HTTPS to the client and is updated in DB.

When client establishes a SocketIO connection with server, the client emits the secret, the server checks if it is valid,
and if so, starts streaming the data.
*/

var secretSchema = new mongoose.Schema({
    arr: [{
        secret: String,
        code: Number
    }]
});

module.exports = mongoose.model('secret', secretSchema);