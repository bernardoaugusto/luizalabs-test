import { Repository, getRepository } from 'typeorm';

import Customer from '../entities/Customer';
import ICustomersRepository from '../../../repositories/ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async create(CustomerData: Customer): Promise<Customer> {
        const Customer = this.ormRepository.create(CustomerData);

        await this.ormRepository.save(Customer);

        return Customer;
    }
}

export default CustomersRepository;
