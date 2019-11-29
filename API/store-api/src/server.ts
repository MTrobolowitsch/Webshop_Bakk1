import errorHandler from "errorhandler";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import * as authController from "./controllers/store";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger.json';

const app = express();
const port = 3001

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/movies", authController.getMovies);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        port,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
