'use strict';
const net = require('net');
// List of {secret: ..., connectionCode: ..., socket: ...}
var arr = [];
// Start a TCP server
//
const start = () => {
    const server = net.createServer(socket => {
        console.log('Client connection');
        socket.on('data', (data) => {
            console.log(data.toString());
        });
        socket.on('end', () => {
    
        })
    })
    
    server.listen(5000, () => {
        console.log('tcpServer.js: TCP server listening on PORT 5000');
    });
}
var tcpServer = {
    arr: arr,
    start: start
}

module.exports = tcpServer;