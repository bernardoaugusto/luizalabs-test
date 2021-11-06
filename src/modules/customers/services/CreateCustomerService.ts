import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
        confirmPassword,
    }: ICreateCustomerDTO): Promise<Customer> {
        if (password !== confirmPassword)
            throw new AppError('The password and this confirm does not match');

        const checkCustomerExists = await this.customersRepository.findByEmail(
            email,
        );

        if (checkCustomerExists) throw new AppError('Email address already used');

        const customer = new Customer();
        Object.assign(customer, {
            name,
            email,
            password,
        });

        return this.customersRepository.create(customer);
    }
}
