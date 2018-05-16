const WebSocketServer = require("ws").Server;
const http = require("http");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const profiles = [{
    id: 223,
    code: 'T-23',
    type: '2-пазовый',
    series: 'Оптима',
    height: '45',
    width: '45',
    length: '6',
    price: '240',
    colors: 'по RAL',
    provider: 'Петралюм',
    description: 'Открыть',
    images: '/img/Optima1 (1).png',
    scheme: '/img/Optima1 (1).png',
}];

app.use(express.static(__dirname + "/"));

const server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);

const wss = new WebSocketServer({server: server});
console.log("websocket server created");

wss.on("connection", function (ws) {
    ws.on('message', m => {

        wss.clients.forEach(client => {
            profiles.push(profiles[0]);
            if (client.redyState === WebSocket.OPEN) {
                client.send(JSON.stringify(profiles));
            }


        });
    });
    ws.send(JSON.stringify(profiles));
});




