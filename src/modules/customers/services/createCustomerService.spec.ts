import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomerService', () => {
    let createCustomerService: CreateCustomerService;
    let customersRepository: {
        create: jest.Mock<any, any>;
        findByEmail: jest.Mock<any, any>;
    };
    let hashProvider: {
        generateHash: jest.Mock<any, any>;
        compareHash: jest.Mock<any, any>;
    };

    beforeEach(() => {
        customersRepository = {
            create: jest.fn(),
            findByEmail: jest.fn(),
        };
        hashProvider = {
            generateHash: jest.fn(),
            compareHash: jest.fn(),
        };

        createCustomerService = new CreateCustomerService(
            customersRepository,
            hashProvider,
        );
    });

    it('Should return the created customer', async () => {
        const customer = {
            name: 'any_name',
            email: 'any_email',
        };

        const sut = {
            ...customer,
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        customersRepository.create.mockResolvedValue(customer);
        const res = await createCustomerService.execute(sut);

        expect(res).toEqual(customer);
        expect(customersRepository.create).toHaveBeenCalledWith({
            ...customer,
            password: undefined,
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
            await createCustomerService.execute(sut);
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

        customersRepository.findByEmail.mockResolvedValue(sut);

        try {
            await createCustomerService.execute(sut);
        } catch (err) {
            expect(err).toEqual(new AppError('Email address already used'));
        }
    });
});
