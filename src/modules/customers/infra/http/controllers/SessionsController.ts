import { Request, Response } from 'express';

import AuthenticateUserService from '../../../services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        return response
            .status(201)
            .json(classToClass({ user: classToClass(user), token }));
    }
}
