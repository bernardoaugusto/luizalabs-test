import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IUpdateCustomerDTO from '../dtos/IUpdateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute(id: string, data: IUpdateCustomerDTO): Promise<Customer> {
        const customer = (await this.customersRepository.findById(id)) as Customer;

        if (data.email) {
            const checkCustomerExists = await this.customersRepository.findByEmail(
                data.email,
            );

            if (checkCustomerExists)
                throw new AppError('Email address already used');
        }

        Object.assign(customer, data);

        return this.customersRepository.update(customer);
    }
}
