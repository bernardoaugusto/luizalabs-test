import Customer from '../../entities/Customer';
import CustomersRepository from '../CustomersRepository';

export const makeSut = async (
    customerData?: Partial<Customer>,
): Promise<Customer> => {
    const customersRepository = new CustomersRepository();
    const sut = new Customer();
    Object.assign(
        sut,
        {
            name: 'any_name',
            email: 'any_emaiil',
            password: 'any_password',
        },
        customerData,
    );

    return customersRepository.create(sut);
};
