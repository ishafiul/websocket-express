const express = require('express')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
require("dotenv").config();

const port = process.env.PORT || 8485;

const wss = new WebSocket.Server({ server:server ,path:'/api/v1/ws/game1'});


const clients = new Map();
wss.on('connection', ws=> {
    const id = uuidv4();
    ws.send(id)
    ws.on('message', (messageAsString) => {
        const data = JSON.parse(messageAsString)
        const username =data.clientId;
        if (data.action === 'connect' ){
            const metadata = { id, username};
            clients.set(ws, metadata);
            //console.log(clients.get(ws))
        }
    })
    ws.on("close", () => {
        clients.delete(ws);
    });
});
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.get('/', (req, res) => res.send('Hello World!'))

server.listen(port, () => console.log(`Lisening on port ${port}`))