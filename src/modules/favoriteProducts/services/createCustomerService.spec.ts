import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import CreateFavoriteProductService from './CreateFavoriteProductService';
import { v4 as uuid } from 'uuid';

describe('CreateFavoriteProductService', () => {
    let createFavoriteProductService: CreateFavoriteProductService;
    let favoriteProductsRepository: {
        create: jest.Mock<any, any>;
        findByCustomerIdAndProductId: jest.Mock<any, any>;
    };

    beforeEach(() => {
        favoriteProductsRepository = {
            create: jest.fn(),
            findByCustomerIdAndProductId: jest.fn(),
        };

        createFavoriteProductService = new CreateFavoriteProductService(
            favoriteProductsRepository,
        );
    });

    it('Should return the created FavoriteProduct', async () => {
        const sut = {
            customerId: 'any_customerId',
            productId: 'any_productId',
        };

        const favoriteProductId = uuid();
        favoriteProductsRepository.create.mockResolvedValue({
            ...sut,
            id: favoriteProductId,
        });
        const res = await createFavoriteProductService.execute(sut);

        expect(res).toEqual({
            ...sut,
            id: favoriteProductId,
        });
        expect(favoriteProductsRepository.create).toHaveBeenCalledWith(sut);
    });

    it('Should return error if the product is already in the favorites list', async () => {
        const sut = {
            customerId: uuid(),
            productId: uuid(),
        };

        favoriteProductsRepository.findByCustomerIdAndProductId.mockResolvedValue(
            sut,
        );

        try {
            await createFavoriteProductService.execute(sut);
        } catch (err) {
            expect(err).toEqual(new AppError('The product is already in favorites'));
        }
    });
});
