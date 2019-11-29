import errorHandler from "errorhandler";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import * as authController from "./controllers/auth";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger.json';

const app = express();

// Express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", authController.postLogin);
app.get("/api/logout", authController.logout);
app.post("/api/signup", authController.postSignup);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(3000, () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        3000,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
