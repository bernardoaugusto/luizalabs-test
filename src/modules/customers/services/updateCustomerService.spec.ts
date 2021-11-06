import 'reflect-metadata';

import UpdateCustomerService from './UpdateCustomerService';
import { v4 as uuid } from 'uuid';

describe('UpdateCustomerService', () => {
    let updateCustomerService: UpdateCustomerService;
    let customersRepository: {
        create: jest.Mock<any, any>;
        findByEmail: jest.Mock<any, any>;
        findById: jest.Mock<any, any>;
        remove: jest.Mock<any, any>;
        update: jest.Mock<any, any>;
    };

    beforeEach(() => {
        customersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
        };

        updateCustomerService = new UpdateCustomerService(customersRepository);
    });

    it('Should return the created customer', async () => {
        const customerId = uuid();
        const sut = {
            name: 'update_name',
            email: 'update_email@mail.com',
        };

        customersRepository.findById.mockResolvedValue({
            id: customerId,
            name: 'any_name',
            email: 'any_email',
        });
        customersRepository.findByEmail.mockResolvedValue(undefined);
        customersRepository.update.mockResolvedValue({
            id: customerId,
            ...sut,
        });

        const res = await updateCustomerService.execute(customerId, sut);

        expect(res).toEqual({
            id: customerId,
            ...sut,
        });
        expect(customersRepository.findById).toHaveBeenCalledWith(customerId);
        expect(customersRepository.findByEmail).toHaveBeenCalledWith(
            'update_email@mail.com',
        );
        expect(customersRepository.update).toHaveBeenCalledWith({
            id: customerId,
            ...sut,
        });
    });
});
