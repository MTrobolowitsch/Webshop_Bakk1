var url = "mongodb://localhost:27017";
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function (err, connection) {
    if (err) throw err;
    let db = connection.db("TestDB");
    console.log(db.name);
    db.createCollection("movies", function (err, result) {
        if (err) {
            console.info(err);
        } else {
            console.log("Collection is created: ", result.collectionName);

            result.insertMany([
                {"name":"Iron Man","date":"2018-12-31T23:00:00.000Z","image":"https://images-na.ssl-images-amazon.com/images/I/515wjJQt2nL.jpg","actor":"Robert Jr.","description":"Iron Man fights against everybody"},
                {"name": lorem.generateWords(1),"date":"2018-12-31T23:00:00.000Z","image":"https://picsum.photos/200/300","actor":lorem.generateWords(1),"description":lorem.generateParagraphs(2)},
                {"name": lorem.generateWords(1),"date":"2018-12-31T23:00:00.000Z","image":"https://picsum.photos/200/300","actor":lorem.generateWords(1),"description":lorem.generateParagraphs(2)}
            ], function (err, result) {
                console.log(result.insertedCount + "Docs inserted in: " + result.collectionName);
            });
        }
        db.createCollection("users", function (err, result) {
            if (err) {
                console.info(err);
            } else {
                console.log("Collection is created: ", result.collectionName);
                result.insertMany([
                    { "name": "1", "password": "1", "registerDate": "2019-11-28T17:39:32.715Z", "isAdmin": false },
                    { "name": "admin", "password": "admin", "registerDate": "2019-11-28T17:39:32.715Z", "isAdmin": true },
                    { "name": "test", "password": "test", "registerDate": "2019-11-28T17:39:32.715Z", "isAdmin": false }
                ], function (err, result) {
                    console.log(result.insertedCount + "Docs inserted in: " + result.collectionName);
                    // close the connection to db when you are done with it
                    connection.close();
                });
            }
        });
    });
});