import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
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
