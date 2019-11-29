
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as request from "request-promise-native";


/**
 * POST /login
 * Sign in using email and password.
 */
export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
    // TODO -> Von Config holen + internal services gateway
    try {
        await request.post({
            uri: "http://127.0.0.1:4001" + "/services/login",
            body: {
                name: req.body.name,
                password: req.body.password
            },
            json: true
        });

        let token = jwt.sign({ name: req.body.name, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'geheim');
        res.json({ token });
    } catch (error) {
        res.status(400).json(error);
        res.end();
    }
};

export const logout = (req: Request, res: Response) => {
    res.json({ loggedOut: true });
};

export const postSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await request.post({
            uri: "http://127.0.0.1:4000" + "/services/signup",
            body: {
                name: req.body.name,
                password: req.body.password
            },
            json: true
        });

        res.json({ registered: true });
    } catch (error) {
        res.status(400).json(error);
        res.end();
    }
};