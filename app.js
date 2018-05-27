const mongo = require('mongodb');
const WebSocketServer = require("ws").Server;
const http = require("http");
const express = require("express");
const db = require("./db/materials");
const app = express();
const port = process.env.PORT || 5050;


app.use(express.static(__dirname + "/"));

const server = http.createServer(app);
console.log(port);
server.listen(port);

const wss = new WebSocketServer({server: server});

const sendClients = res => {
    wss.clients.forEach(client => {
        if (client.redyState === WebSocketServer.OPEN) {
            client.send(res);
        }
    });
};

function addProfile(obj) {
    if (obj.series) {
        db.find('seriesForProfiles', {name: obj.series}).then(i => {
            if (!i) {
                db.add('seriesForProfiles', {name: obj.series}).then(o => {
                    if (o.status === 1) {
                        db.getAll("seriesForProfiles").then(arr => sendClients(stringify({
                            label: "seriesForProfiles",
                            items: arr
                        }))).catch(err => {
                            throw err
                        });
                    }
                })
            }
        })
    }
    if (obj.type) {
        obj.type.forEach(t => {
            db.find('typeForProfiles', {name: t}).then(i => {
                if (!i) {
                    db.add('typeForProfiles', {name: t}).then(o => {
                        if (o.status === 1) {
                            db.getAll("typeForProfiles").then(arr => sendClients(stringify({
                                label: "typeForProfiles",
                                items: arr
                            }))).catch(err => {
                                throw err
                            });
                        }
                    })
                }
            })
        });
    }
    if (obj.provider) {
        obj.provider.forEach(t => {
            db.find('provider', {name: t}).then(i => {
                if (!i) {
                    db.add('provider', {name: t}).then(o => {
                        if (o.status === 1) {
                            db.getAll("provider").then(arr => sendClients(stringify({
                                label: "provider",
                                items: arr
                            }))).catch(err => {
                                throw err
                            });
                        }
                    })
                }
            })
        });

    }
    if (obj.painting) {
        obj.painting.forEach(t => {
            db.find('colour', {name: t}).then(i => {
                if (!i) {
                    db.add('colour', {name: t}).then(o => {
                        if (o.status === 1) {
                            db.getAll("colour").then(arr => sendClients(stringify({
                                label: "colour",
                                items: arr
                            }))).catch(err => {
                                throw err
                            });
                        }
                    })
                }
            })
        });
    }

}

function control(obj, ws) {
    if (obj.code) {
        switch (obj.code) {
            case 'add':
                db.add(obj.collection, obj.item).then(i => {
                    if (i.status === 1) {
                        ws.send(stringify(i));
                        if (obj.collection === "materialsProfiles") {
                            addProfile(obj.item);
                        }
                        db.getAll(obj.collection).then(arr => sendClients(stringify({
                            label: obj.collection,
                            items: arr
                        }))).catch(err => {
                            throw err
                        });
                    }
                });
                break;
            case 'remove':
                sendClients(getProfile());
                break;
            case 'get':
                ws.send(getProfile());
                break;
            case 'getAll':
                db.getAll(obj.collection).then(arr => ws.send(stringify({
                    label: obj.collection,
                    items: arr
                }))).catch(err => {
                    throw err
                });
                break;
        }
    }
}

const stringify = o => JSON.stringify(o ? o : []);

wss.on("connection", ws => {

    ws.on('message', m => {
        control(JSON.parse(m), ws);
    });

});




