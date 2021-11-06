import AuthenticateUserService from '../../../services/AuthenticateUserService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

interface IAuthenticateResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

export default class SessionsController {
    public async create(
        requestBody: IAuthenticateRequest,
    ): Promise<IAuthenticateResponse> {
        const { email, password } = requestBody;

        const authenticateUserService = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticateUserService.execute({
            email,
            password,
        });

        return { user: classToClass(user), token };
    }
}
