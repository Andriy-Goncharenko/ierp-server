const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://admin:11212217q@ds229380.mlab.com:29380/ierp-db";


const getAll = collection => {
    return promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db("ierp-db");
            dbo.collection(collection).find({}).toArray((err, res) => {
                if (err) reject(err);
                resolve(res);
            });
            db.close();
        });
    });
};
const find = (collection, query) => {
    return promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db("ierp-db");
            dbo.collection(collection).findOne(query, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
            db.close();
        });
    });
};
const remove = (collection, query) => {
    return promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db("ierp-db");
            dbo.collection(collection).remove(query, (err, res) => {
                if (err) reject(err);
                resolve({status: 1});
            });
            db.close();
        });
    });
};
const update = (collection, id, query) => {
    return promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db("ierp-db");
            dbo.collection(collection).updateOne({_id: id}, query, (err, res) => {
                if (err) reject(err);
                resolve({status: 2});
            });
            db.close();
        });
    });
};
const add = (collection, obj) => {
    return promise = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db("ierp-db");

            dbo.collection(collection).insertOne(obj, (err, res) => {
                if (err) reject(err);
                resolve({status: 1});
                db.close();
            });
            db.close();
        });
    });
};

exports.getAll = getAll;
exports.add = add;
exports.find = find;
exports.remove = remove;
exports.update = update;
