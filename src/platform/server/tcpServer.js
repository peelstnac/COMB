'use strict';
const net = require('net');
// List of {secret: ..., connectionCode: ..., socket: ...}
var arr = [];
// Start a TCP server
//
const start = (io) => {
    const server = net.createServer(socket => {
        socket.on('data', (data) => {
            var str = data.toString();
            let connectionCode = Number(str.split(/\r?\n/)[0]);
            // TODO maybe use a map instead of an array so we can get rid of the O(n)
            for (let i = arr.length - 1; i >= 0; i--) {
                if (arr[i].connectionCode === connectionCode) {
                    // FIX: each socket is assigned its own room with name connectionCode
                    io.to(connectionCode.toString()).emit('console', str);
                    break;
                }
            }
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