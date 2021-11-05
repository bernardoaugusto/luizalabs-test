import { Request, Response } from 'express';

import CreateCustomerService from '../../../services/CreateCustomerService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class CustomersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password, confirmPassword } = request.body;

        const createCustomerService = container.resolve(CreateCustomerService);

        const customerCreated = await createCustomerService.execute({
            email,
            password,
            name,
            confirmPassword,
        });

        return response.status(201).json(classToClass(customerCreated));
    }
}
