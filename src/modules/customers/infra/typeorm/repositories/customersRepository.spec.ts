import Customer from '../entities/Customer';
import CustomersRepository from './CustomersRepository';
import connection from '../../../../../shared/infra/connection';
import faker from 'faker';
import { makeSut } from './fake/makeSut';

describe('CustomersRepository', () => {
    let customersRepository: CustomersRepository;

    beforeAll(async () => {
        await connection(true);
        customersRepository = new CustomersRepository();
    });

    it('Should be able to insert a new Customer', async () => {
        const sut = new Customer();
        Object.assign(sut, {
            name: 'any_name',
            email: 'any_emaiil',
            password: 'any_password',
        });

        const { id, ...customerRes } = await customersRepository.create(sut);

        expect(id).toBeDefined();
        expect(customerRes).toEqual(sut);
    });

    it('should be able to return a customer by email', async () => {
        const sut = await makeSut({ email: faker.internet.email() });

        const foundCustomer = (await customersRepository.findByEmail(
            sut.email,
        )) as Customer;

        expect(foundCustomer).toBeTruthy();
        expect(foundCustomer.id).toBe(sut.id);
    });
});
