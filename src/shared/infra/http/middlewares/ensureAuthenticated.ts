import { NextFunction, Request, Response } from 'express';

import AppError from '../../../errors/AppError';
import authConfig from '../../../../config/auth';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request & { user?: { id: string } },
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing!', 401);
    }

    const [format, token] = authHeader.split(' ');

    try {
        if (format !== 'Bearer') {
            throw new AppError('Invalid JWT token', 401);
        }

        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
