const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8083 });
let value = '';

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    value = message;
  })
  ws.send(value)
})