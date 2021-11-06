import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import '../../container';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '../../errors/AppError';
import cors from 'cors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import routes from './routes';

require('express-async-errors');

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        dotenv.config();

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(routes);
        this.app.use(errors());
        this.app.use(
            (err: Error, request: Request, response: Response, _: NextFunction) => {
                if (err instanceof AppError) {
                    return response.status(err.statusCode).json({
                        statusCode: err.statusCode,
                        message: err.message,
                    });
                }

                return response.status(500).json({
                    statusCode: 500,
                    message: err.message,
                });
            },
        );
    }
}

export default new App().app;
