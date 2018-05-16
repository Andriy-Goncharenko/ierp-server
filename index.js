const express = require('express');
const app = express();
const WebSocket = require('ws');
const WSS = new WebSocket.Server({port: 3030});
const http = require('http');
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


WSS.on('connection', ws => {

    ws.on('message', m => {
        profiles.push(profiles[0]);
        WSS.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(profiles));
            }
        });
    });

    ws.send(JSON.stringify(profiles));

});


app.get('/', (req, res) => {
    res.send('Привет Андрей');
});


http.createServer(app).listen(8080, function () {
    console.log("Express server listening on port Number" + 8080);
});

