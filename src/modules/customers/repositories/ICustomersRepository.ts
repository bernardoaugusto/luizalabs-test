import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
    create(customer: Customer): Promise<Customer>;
    findByEmail(email: string): Promise<Customer | undefined>;
    findById(id: string): Promise<Customer | undefined>;
}
