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

app.get("/services/movies", async (req, res, next) => {
    var collection = mongoDb.collection("movies");
    collection.find({}).toArray((function (err, result) {
        if (err) res.status(400).json(err);;
        res.json({ movies: result });
        res.end();
    }));
});

import * as swaggerDocument from './swagger.json';

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(4002, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        4002,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
