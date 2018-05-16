const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.get('/', (req, res) => {
    res.send('Привет Андрей');
});
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

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on('connection', ws => {

    ws.on('message', message => {
        profiles.push(profiles[0]);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(profiles));
            }
        });
    });
    ws.send(JSON.stringify(profiles));
});

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});