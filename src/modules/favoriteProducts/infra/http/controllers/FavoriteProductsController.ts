import { Request, Response } from 'express';

import CreateFavoriteProductService from '../../../services/CreateFavoriteProductService';
import GetFavoriteProductsService from '../../../services/GetFavoriteProductsService';
import RemoveFavoriteProductService from '../../../services/RemoveFavoriteProductService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class FavoriteProductsController {
    public async create(
        request: Request & { user?: { id: string } },
        response: Response,
    ): Promise<Response> {
        const productId = request.params.id;
        const customerId = request.user!.id;

        const createFavoriteProductService = container.resolve(
            CreateFavoriteProductService,
        );

        const customerCreated = await createFavoriteProductService.execute({
            customerId,
            productId,
        });

        return response.status(201).json(classToClass(customerCreated));
    }

    public async get(
        request: Request & { user?: { id: string } },
        response: Response,
    ): Promise<Response> {
        const customerId = request.user!.id;

        const getFavoriteProductsService = container.resolve(
            GetFavoriteProductsService,
        );

        const customerCreated = await getFavoriteProductsService.execute(customerId);

        return response.status(200).json(classToClass(customerCreated));
    }

    public async remove(
        request: Request & { user?: { id: string } },
        response: Response,
    ): Promise<Response> {
        const productId = request.params.id;
        const customerId = request.user!.id;

        const removeFavoriteProductService = container.resolve(
            RemoveFavoriteProductService,
        );

        const customerCreated = await removeFavoriteProductService.execute({
            customerId,
            productId,
        });

        return response.status(204).json(classToClass(customerCreated));
    }
}
