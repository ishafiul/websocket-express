const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server:server ,path:'/api/v1/ws/game1'});

wss.on('connection', function connection(ws) {
    console.log('A new client Connected!');
    ws.send('Welcome New Client!');
    let i = 0
    setInterval(()=>{
        ws.send(i)
        i++
    },20)
});

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(8485, () => console.log(`Lisening on port :8485`))