import { Repository, getRepository } from 'typeorm';

import Customer from '../entities/Customer';
import ICustomersRepository from '../../../repositories/ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
    private ormRepository: Repository<Customer>;

    constructor() {
        this.ormRepository = getRepository(Customer);
    }

    public async create(customerData: Customer): Promise<Customer> {
        const customer = this.ormRepository.create(customerData);

        await this.ormRepository.save(customer);

        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({
            where: { email },
        });
    }

    public async findById(id: string): Promise<Customer | undefined> {
        return this.ormRepository.findOne({
            where: { id },
        });
    }

    public async remove(id: string): Promise<void> {
        await this.ormRepository.delete({ id });
    }

    public async update(customer: Customer): Promise<Customer> {
        return this.ormRepository.save(customer);
    }
}

export default CustomersRepository;
