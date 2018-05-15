const WebSocket = require('ws');

const server = new WebSocket.Server({port: 8080});

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

server.on('connection', ws => {
    ws.on('message', message => {
        profiles.push(JSON.parse(message));
        server.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(profiles));
            }
        });
    });
    ws.send(JSON.stringify(profiles));
});