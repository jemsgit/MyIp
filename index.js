const request = require('request');
const WebSocketClient = require('websocket').client;

let ipIntervalId;
let connectTimeoutId;

function connect(){
    var client = new WebSocketClient();
    client.connect('ws://localhost:8083/');
    
    client.on('connect', function(connection) {
        clearTimeout(connectTimeoutId);
        ipIntervalId = setInterval(function(){
            request('http://icanhazip.com/', function (error, response, body) {
                if(!error) {
                    console.log(body)
                    connection.sendUTF(body);
                }
            })
        }, 5000)
    
        connection.on('close', function(e) {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            clearInterval(ipIntervalId);
            connectTimeoutId = setTimeout(function() {
              connect();
            }, 2000);
          })
    });

    client.on('connectFailed', function(e) {
        setTimeout(function() {
            console.log('Socket connection is faled. Reconnect will be attempted in 2 second.', e.reason);
            connect();
        }, 2000);
    });
    
}

connect();

