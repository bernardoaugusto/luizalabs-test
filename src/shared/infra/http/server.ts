import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import AppError from '../../errors/AppError';
import connection from '../connection';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: err.message,
    });
});

app.listen(3000, () => {
    connection();

    console.log('😁 Server started on port 3000 😁');
});
