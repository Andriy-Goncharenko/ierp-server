const mongo = require('mongodb');
const WebSocketServer = require("ws").Server;
const http = require('http');
const path = require('path');
const express = require("express");
const db = require("./db/materials");
const app = express();
const ObjectId = require('mongodb').ObjectId;


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const server = http.createServer(app);
server.listen(5050);

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
                        })));
                    }
                });
                break;
            case 'remove':
                obj.find._id = ObjectId(obj.find._id);
                db.remove(obj.collection, obj.find).then(i => {
                    if (i) {
                        ws.send(stringify({
                            label: "remove/" + obj.collection,
                            status: i.status
                        }));
                        db.getAll(obj.collection).then(arr => sendClients(stringify({
                            label: obj.collection,
                            items: arr
                        })));
                    }
                }).catch((e) => console.log(e));
                break;
            case 'update':
                obj.id = ObjectId(obj.id);
                db.update(obj.collection, obj.id, obj.item).then(i => {
                    if (i) {
                        ws.send(stringify({
                            label: "update/" + obj.collection,
                            status: i.status
                        }));
                        db.getAll(obj.collection).then(arr => sendClients(stringify({
                            label: obj.collection,
                            items: arr
                        })));
                    }
                }).catch((e) => console.log(e));
                break;
            case 'get':
                obj.find._id = ObjectId(obj.find._id);
                db.find(obj.collection, obj.find).then(i => {
                    if (i) {
                        ws.send(stringify({
                            label: "get/" + obj.collection,
                            item: i
                        }));
                    }
                }).catch((e) => console.log(e));
                break;
            case 'getAll':
                db.getAll(obj.collection).then(arr => ws.send(stringify({
                    label: obj.collection,
                    items: arr
                })));
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




