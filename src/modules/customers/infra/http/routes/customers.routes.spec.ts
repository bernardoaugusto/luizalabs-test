import 'reflect-metadata';

import CreateCustomerService from '../../../services/CreateCustomerService';
import Customer from '../../typeorm/entities/Customer';
import app from '../../../../../shared/infra/http/app';
import { container } from 'tsyringe';
import request from 'supertest';
import sinon from 'sinon';

describe('Customers Routes', () => {
    beforeEach(() => {
        sinon.restore();
    });

    it('should call service of create a customers correctly and return status 201', async () => {
        const createCustomersServiceSpy =
            sinon.createStubInstance(CreateCustomerService);
        sinon.stub(container, 'resolve').returns(createCustomersServiceSpy);

        const customer = {
            name: 'any_name',
            email: 'any_email@email.com',
            password: 'any_password',
        };

        const sut = {
            ...customer,
            confirmPassword: 'any_password',
        };

        createCustomersServiceSpy.execute.returns(
            new Promise(resolve => resolve(customer as Customer)),
        );

        const response = await request(app).post('/api/customers').send(sut);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(customer);
        expect(createCustomersServiceSpy.execute.called).toBe(true);
    });

    it('should not call service of create and return status 400 when not send correctly data', async () => {
        const createCustomersServiceSpy =
            sinon.createStubInstance(CreateCustomerService);

        const response = await request(app).post('/api/customers');

        expect(response.status).toBe(400);
        expect(response.body.validation.body.keys).toEqual([
            'name',
            'email',
            'password',
            'confirmPassword',
        ]);
        expect(createCustomersServiceSpy.execute.notCalled).toBe(true);
    });

    it('should not call service of create and return status 400 when email is not valid', async () => {
        const createCustomersServiceSpy =
            sinon.createStubInstance(CreateCustomerService);

        const sut = {
            name: 'any_name',
            email: 'invalid_email',
            password: 'any_password',
            confirmPassword: 'any_password',
        };

        const response = await request(app).post('/api/customers').send(sut);

        expect(response.status).toBe(400);
        expect(response.body.validation.body.keys).toEqual(['email']);
        expect(createCustomersServiceSpy.execute.notCalled).toBe(true);
    });
});
