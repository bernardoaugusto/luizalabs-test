import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import RemoveFavoriteProductService from './RemoveFavoriteProductService';
import { v4 as uuid } from 'uuid';

describe('RemoveFavoriteProductService', () => {
    let removeFavoriteProductService: RemoveFavoriteProductService;
    let favoriteProductsRepository: {
        create: jest.Mock<any, any>;
        findByCustomerIdAndProductId: jest.Mock<any, any>;
        findAllFavoriteProductsByCustomerId: jest.Mock<any, any>;
        removeByCustomerIdAndProductId: jest.Mock<any, any>;
        removeByCustomerId: jest.Mock<any, any>;
    };

    beforeEach(() => {
        jest.clearAllMocks();
        favoriteProductsRepository = {
            create: jest.fn(),
            findByCustomerIdAndProductId: jest.fn(),
            findAllFavoriteProductsByCustomerId: jest.fn(),
            removeByCustomerIdAndProductId: jest.fn(),
            removeByCustomerId: jest.fn(),
        };

        removeFavoriteProductService = new RemoveFavoriteProductService(
            favoriteProductsRepository,
        );
    });

    it('Should return the void id remove FavoriteProduct', async () => {
        const sut = {
            customerId: uuid(),
            productId: uuid(),
        };

        const favoriteProductId = uuid();
        favoriteProductsRepository.findByCustomerIdAndProductId.mockResolvedValue({
            ...sut,
            id: favoriteProductId,
        });
        const res = await removeFavoriteProductService.execute(sut);

        expect(res).toBeUndefined();
        expect(
            favoriteProductsRepository.removeByCustomerIdAndProductId,
        ).toHaveBeenCalledWith(sut.customerId, sut.productId);
    });

    it('Should return error if the product is not in favorites list', async () => {
        const sut = {
            customerId: uuid(),
            productId: uuid(),
        };

        favoriteProductsRepository.findByCustomerIdAndProductId.mockResolvedValue(
            undefined,
        );

        try {
            await removeFavoriteProductService.execute(sut);
        } catch (err: any) {
            expect(err).toBeInstanceOf(AppError);
            expect(err.message).toBe('The product is not in favorites');
        }
    });
});
