import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import Customer from '../infra/typeorm/entities/Customer';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
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

        const hashedPassword = await this.hashProvider.generateHash(password);

        const customer = new Customer();
        Object.assign(customer, {
            name,
            email,
            password: hashedPassword,
        });

        return this.customersRepository.create(customer);
    }
}
