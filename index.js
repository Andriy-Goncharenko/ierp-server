const express = require('express');
const app = express();
app.use(express.static('public'));


/*const WebSocket = require('ws');
const expressWs = require('express-ws')(app);

const wsInstance = expressWs.getWss('/');*/

/*const profiles = [{
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
}];*/

app.get('/', (req, res) => {
    res.send('Привет Андрей');
});

/*
app.ws('/', ws => {
    ws.on('message', message => {
        profiles.push(profiles[0]);
        wsInstance.clients.forEach(client => {
            console.log(client.readyState, WebSocket.OPEN);
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(profiles));
            }
        });
    });
    ws.send(JSON.stringify(profiles));
});
*/

app.listen(8080);