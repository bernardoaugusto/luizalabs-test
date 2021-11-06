import { Request, Response } from 'express';

import CreateCustomerService from '../../../services/CreateCustomerService';
import GetCustomerService from '../../../services/GetCustomerService';
import RemoveCustomerService from '../../../services/RemoveCustomerService';
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

    public async get(
        request: Request & { user?: { id: string } },
        response: Response,
    ): Promise<Response> {
        const customerId = request.user!.id;

        const createCustomerService = container.resolve(GetCustomerService);

        const customer = await createCustomerService.execute(customerId);

        return response.status(200).json(classToClass(customer));
    }

    public async remove(
        request: Request & { user?: { id: string } },
        response: Response,
    ): Promise<Response> {
        const customerId = request.user!.id;

        const removeCustomerService = container.resolve(RemoveCustomerService);

        const customer = await removeCustomerService.execute(customerId);

        return response.status(204).json(classToClass(customer));
    }
}
