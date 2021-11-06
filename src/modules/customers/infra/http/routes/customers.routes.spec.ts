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
        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(customer);
        expect(createCustomersServiceSpy.execute.called).toBe(true);
    });
});