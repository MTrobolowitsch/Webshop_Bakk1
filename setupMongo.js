var url = "mongodb://localhost:27017";
 
var MongoClient = require('mongodb').MongoClient;
 
    MongoClient.connect(url, function(err, connection) {
        if (err) throw err;
        let db = connection.db("TestDB");
        console.log(db.name);
        db.createCollection("movies", function(err, result) {
            if (err) {
                console.info(err);
            }else{
                console.log("Collection is created: ",  result.collectionName);
                result.insertMany([
                    {"name":"Iron Man","date":null,"image":"https://images-na.ssl-images-amazon.com/images/I/515wjJQt2nL.jpg"},
                    {"name":"Iron Man","date":null,"image":"https://images-na.ssl-images-amazon.com/images/I/515wjJQt2nL.jpg"},
                    {"name":"Iron Man","date":null,"image":"https://images-na.ssl-images-amazon.com/images/I/515wjJQt2nL.jpg"}
                ],function(err,result){
                    console.log(result.insertedCount + "Docs inserted in: " + result.collectionName);
                });
            }
            db.createCollection("users", function(err, result) {
                if (err) {
                    console.info(err);
                }else{
                    console.log("Collection is created: ",  result.collectionName);
                    result.insertMany([
                        {"name":"1","password":"1","registerDate":"2019-11-28T17:39:32.715Z","isAdmin":false},
                        {"name":"admin","password":"admin","registerDate":"2019-11-28T17:39:32.715Z","isAdmin":true},
                        {"name":"test","password":"test","registerDate":"2019-11-28T17:39:32.715Z","isAdmin":false}
                    ],function(err,result){
                        console.log(result.insertedCount + "Docs inserted in: " + result.collectionName);
                        // close the connection to db when you are done with it
                        connection.close();
                    });
                }
            });
        });
    });