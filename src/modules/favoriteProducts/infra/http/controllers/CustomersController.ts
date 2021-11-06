import { Request, Response } from 'express';

import CreateFavoriteProductService from '../../../services/CreateFavoriteProductService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class FavoriteProductsController {
    public async create(
        request: Request & { user: { id: string } },
        response: Response,
    ): Promise<Response> {
        const { productId } = request.params;
        const customerId = request.user.id;

        const createFavoriteProductService = container.resolve(
            CreateFavoriteProductService,
        );

        const customerCreated = await createFavoriteProductService.execute({
            customerId,
            productId,
        });

        return response.status(201).json(classToClass(customerCreated));
    }
}
