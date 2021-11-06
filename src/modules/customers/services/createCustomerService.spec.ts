import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomerService', () => {
    let service: CreateCustomerService;
    let repository: {
        create: jest.Mock<any, any>;
        findByEmail: jest.Mock<any, any>;
    };

    beforeEach(() => {
        repository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
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

    it('Should return an error if password and confirm Password is different', async () => {
        const sut = {
            name: 'any_name',
            email: 'any_email',
            password: 'abc',
            confirmPassword: 'def',
        };

        try {
            await service.execute(sut);
        } catch (err) {
            expect(err).toEqual(
                new AppError('The password and this confirm does not match'),
            );
        }
    });

    it('Should return error if email is already registered', async () => {
        const sut = {
            name: 'any_name',
            email: 'emailAlreadyRegistered',
            password: 'abc',
            confirmPassword: 'abc',
        };

        repository.findByEmail.mockResolvedValue(sut);

        try {
            await service.execute(sut);
        } catch (err) {
            expect(err).toEqual(new AppError('Email address already used'));
        }
    });
});
