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

const wss = new WebSocketServer({server: server});

const sendClients = res => {
    wss.clients.forEach(client => {
        if (client.redyState === WebSocketServer.OPEN) {
            client.send(res);
        }
    });
};

function control(obj, ws) {
    if (obj.code) {
        switch (obj.code) {
            case 'add':
                profiles.push({
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
                });
                sendClients(getProfile());
                break;
            case 'remove':
                profiles.splice(profiles.length - 1, 1);
                sendClients(getProfile());
                break;
            case 'get':
                ws.send(getProfile());
                break;
        }
    }
}

const getProfile = () => JSON.stringify(profiles ? profiles : []);

wss.on("connection", ws => {

    ws.on('message', m => {
        control(JSON.parse(m), ws);
    });

});




