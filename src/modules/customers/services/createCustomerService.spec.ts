import 'reflect-metadata';

import CreateCustomerService from './CreateCustomerService';
import ICustomersRepository from '../repositories/ICustomersRepository';

describe('CreateCustomerService', () => {
    let service: CreateCustomerService;
    let repository: {
        create: jest.Mock<any, any>;
    };

    beforeEach(() => {
        repository = {
            create: jest.fn(),
        };

        service = new CreateCustomerService(repository);
    });

    it('Should return the created customer', async () => {
        const sut = {
            name: 'any_name',
            email: 'any_email',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        repository.create.mockResolvedValue({
            name: sut.name,
            email: sut.email,
            password: sut.password,
        });
        const res = await service.execute(sut);

        expect(res).toEqual({
            name: sut.name,
            email: sut.email,
            password: sut.password,
        });
    });
});
