import { injectable, inject } from 'tsyringe';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class GetCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(customerId: string): Promise<Customer> {
        return (await this.customersRepository.findById(customerId)) as Customer;
    }
}
