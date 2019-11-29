import errorHandler from "errorhandler";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

import swaggerUi from "swagger-ui-express";
import { MongoClient, Db } from "mongodb";
const url = 'mongodb://localhost:27017';
const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbName = 'TestDB';
let mongoDb: Db;

MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    mongoDb = db;
});

app.post("/services/login", async (req, res, next) => {
    var collection = mongoDb.collection("users");
    
    console.log({name: req.body.name,
        password: req.body.password,});
    try {
        var result = await collection.findOne({
            name: req.body.name,
            password: req.body.password,
        });
        console.log({name: req.body.name,
            password: req.body.password,});
        if (result){
    
            res.json({ loggedIn: true });
            res.end();
        }
    } catch (error) {
        
        res.status(400).json({loggedIn: false});
    }
});

import * as swaggerDocument from './swagger.json';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(4001, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        3000,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
