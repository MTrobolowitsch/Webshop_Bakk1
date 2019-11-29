
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as request from "request-promise-native";

export const getMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response = await request.get({
            uri: "http://127.0.0.1:8090" + "/services/movies",
            json: true
        });

        res.json({movies: Array.isArray(response.movies) ? response.movies : [response.movies]});
    } catch (error) {
        res.status(400).json(error);
        res.end();
    }
};