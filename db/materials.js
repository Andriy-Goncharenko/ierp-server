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
/*
MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    const dbo = db.db("ierp-db");

    const obj = {
        vc: "T23",
        type: "2-x пазовый",
        series: "OPTIMA",
        thickness: "45",
        width: "45",
        length: "6",
        price: "336",
        images: ["/img/Optima1 (1).png"],
        scheme: ["/img/1526756056366.jpg"],
        provider: ["Перталюм"],
        groove: "8.5",
        material: "Алюминий",
        painting: ["RAL 9016"],
        description: "",
        catalog: "https://drive.google.com/file/d/0B7nlCQdCENfwc25rYW5Kc0RnVGM/view"
    };
    /!*dbo.collection("materialsProfiles").insertOne(obj, (err, res) => {
        if (err) throw err;
        console.log("Добавил");
        db.close();
    }); *!/
    dbo.collection("materialsProfiles").find({}).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    });

    db.close();
})
;*/
