import { injectable, inject } from 'tsyringe';
import IFavoriteProductsRepository from '../../favoriteProducts/repositories/IFavoriteProductsRepository';
import ICustomersRepository from '../repositories/ICustomersRepository';

@injectable()
export default class RemoveCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('FavoriteProductsRepository')
        private favoriteProductsRepository: IFavoriteProductsRepository,
    ) {}

    public async execute(customerId: string): Promise<void> {
        await this.favoriteProductsRepository.removeByCustomerId(customerId);

        return this.customersRepository.remove(customerId);
    }
}
