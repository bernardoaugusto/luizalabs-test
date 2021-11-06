import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import CreateFavoriteProductService from './CreateFavoriteProductService';
import { v4 as uuid } from 'uuid';

describe('CreateFavoriteProductService', () => {
    let createFavoriteProductService: CreateFavoriteProductService;
    let favoriteProductsRepository: {
        create: jest.Mock<any, any>;
        findByCustomerIdAndProductId: jest.Mock<any, any>;
        findAllFavoriteProductsByCustomerId: jest.Mock<any, any>;
        removeByCustomerIdAndProductId: jest.Mock<any, any>;
        removeByCustomerId: jest.Mock<any, any>;
    };
    let getProductByIdService: {
        execute: jest.Mock<any, any>;
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
        getProductByIdService = {
            execute: jest.fn(),
        };

        createFavoriteProductService = new CreateFavoriteProductService(
            favoriteProductsRepository,
            getProductByIdService,
        );
    });

    it('Should return the created FavoriteProduct', async () => {
        const sut = {
            customerId: uuid(),
            productId: uuid(),
        };

        const favoriteProductId = uuid();
        favoriteProductsRepository.create.mockResolvedValue({
            ...sut,
            id: favoriteProductId,
        });
        getProductByIdService.execute.mockResolvedValue({
            id: sut.productId,
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

    it('Should return error if product not found', async () => {
        const sut = {
            customerId: uuid(),
            productId: uuid(),
        };

        favoriteProductsRepository.findByCustomerIdAndProductId.mockResolvedValue(
            undefined,
        );
        getProductByIdService.execute.mockResolvedValue(
            new AppError('product not found'),
        );

        try {
            await createFavoriteProductService.execute(sut);
        } catch (err) {
            expect(err).toEqual(new AppError('product not found'));
        }
    });
});
