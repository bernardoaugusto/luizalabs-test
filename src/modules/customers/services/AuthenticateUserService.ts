import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import Customer from '../infra/typeorm/entities/Customer';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';
import authConfig from '../../../config/auth';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    customer: Customer;
    token: string;
}

@injectable()
export default class AuthenticateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const errorMessage = 'Invalid email/password combination';
        const customer = await this.customersRepository.findByEmail(email);

        if (!customer) throw new AppError(errorMessage, 401);

        const passwordMatched = await this.hashProvider.compareHash(
            password,
            customer.password,
        );

        if (!passwordMatched) throw new AppError(errorMessage, 401);

        const { expiresIn, secret } = authConfig.jwt;

        const token = sign(
            {
                name: customer.name,
            },
            secret,
            { subject: customer.id, expiresIn: `${expiresIn}` },
        );

        return { customer, token };
    }
}
