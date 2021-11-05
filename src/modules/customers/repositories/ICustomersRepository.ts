import Customer from '../infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
    create(customer: Customer): Promise<Customer>;
}
