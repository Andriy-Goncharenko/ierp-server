const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://admin:11212217q@ds229380.mlab.com:29380/ierp-db";

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
    /*dbo.collection("materialsProfiles").insertOne(obj, (err, res) => {
        if (err) throw err;
        console.log("Добавил");
        db.close();
    }); */
    dbo.collection("materialsProfiles").find({}).toArray((err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    });

    db.close();
})
;