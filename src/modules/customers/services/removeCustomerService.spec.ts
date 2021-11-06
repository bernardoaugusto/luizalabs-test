import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import RemoveCustomerService from './RemoveCustomerService';
import { v4 as uuid } from 'uuid';

describe('RemoveCustomerService', () => {
    let removeCustomerService: RemoveCustomerService;
    let customersRepository: {
        create: jest.Mock<any, any>;
        findByEmail: jest.Mock<any, any>;
        findById: jest.Mock<any, any>;
        remove: jest.Mock<any, any>;
    };
    let favoriteProductsRepository: {
        create: jest.Mock<any, any>;
        findByCustomerIdAndProductId: jest.Mock<any, any>;
        findAllFavoriteProductsByCustomerId: jest.Mock<any, any>;
        removeByCustomerIdAndProductId: jest.Mock<any, any>;
        removeByCustomerId: jest.Mock<any, any>;
    };

    beforeEach(() => {
        customersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
        };
        favoriteProductsRepository = {
            create: jest.fn(),
            findByCustomerIdAndProductId: jest.fn(),
            findAllFavoriteProductsByCustomerId: jest.fn(),
            removeByCustomerIdAndProductId: jest.fn(),
            removeByCustomerId: jest.fn(),
        };

        removeCustomerService = new RemoveCustomerService(
            customersRepository,
            favoriteProductsRepository,
        );
    });

    it('Should return void if remove customer', async () => {
        const id = uuid();
        favoriteProductsRepository.removeByCustomerId.mockResolvedValue(undefined);
        customersRepository.remove.mockResolvedValue(undefined);

        const res = await removeCustomerService.execute(id);

        expect(res).toBeUndefined();
        expect(favoriteProductsRepository.removeByCustomerId).toHaveBeenCalledWith(
            id,
        );
        expect(customersRepository.remove).toHaveBeenCalledWith(id);
    });
});
