import Customer from '../entities/Customer';
import CustomersRepository from './CustomersRepository';
import connection from '../../../../../shared/infra/connection';

describe('CustomersRepository', () => {
    let customersRepository: CustomersRepository;

    beforeAll(async () => {
        await connection(true);
        customersRepository = new CustomersRepository();
    });

    it('Should be able to insert a new Customer', async () => {
        const customer = new Customer();
        Object.assign(customer, {
            name: 'any_name',
            email: 'any_emaiil',
            password: 'any_password',
        });

        const { id, ...customerRes } = await customersRepository.create(customer);

        expect(id).toBeDefined();
        expect(customerRes).toEqual(customer);
    });
});
