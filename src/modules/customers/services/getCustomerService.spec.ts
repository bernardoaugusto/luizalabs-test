import 'reflect-metadata';

import GetCustomerService from './GetCustomerService';
import { v4 as uuid } from 'uuid';

describe('GetCustomerService', () => {
    let getCustomerService: GetCustomerService;
    let customersRepository: {
        create: jest.Mock<any, any>;
        findByEmail: jest.Mock<any, any>;
        findById: jest.Mock<any, any>;
        remove: jest.Mock<any, any>;
    };

    beforeEach(() => {
        customersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
        };

        getCustomerService = new GetCustomerService(customersRepository);
    });

    it('Should be return a customer by id', async () => {
        const customerId = uuid();

        customersRepository.findById.mockResolvedValue({ id: customerId });
        const res = await getCustomerService.execute(customerId);

        expect(res.id).toBe(customerId);
        expect(customersRepository.findById).toHaveBeenCalledWith(customerId);
    });
});
