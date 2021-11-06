import { Repository, getRepository } from 'typeorm';

import FavoriteProduct from '../entities/FavoriteProduct';
import IFavoriteProductsRepository from '../../../repositories/IFavoriteProductsRepository';

class FavoriteProductsRepository implements IFavoriteProductsRepository {
    private ormRepository: Repository<FavoriteProduct>;

    constructor() {
        this.ormRepository = getRepository(FavoriteProduct);
    }

    public async create(
        favoriteProductData: FavoriteProduct,
    ): Promise<FavoriteProduct> {
        const favoriteProduct = this.ormRepository.create(favoriteProductData);

        await this.ormRepository.save(favoriteProduct);

        return favoriteProduct;
    }

    public async findByCustomerIdAndProductId(
        customerId: string,
        productId: string,
    ): Promise<FavoriteProduct | undefined> {
        return this.ormRepository.findOne({
            where: { customerId, productId },
        });
    }

    public async findAllFavoriteProductsByCustomerId(
        customerId: string,
    ): Promise<Array<FavoriteProduct>> {
        return this.ormRepository.find({
            where: { customerId },
        });
    }

    public async removeByCustomerIdAndProductId(
        customerId: string,
        productId: string,
    ): Promise<void> {
        await this.ormRepository.delete({ customerId, productId });
    }

    public async removeByCustomerId(customerId: string): Promise<void> {
        await this.ormRepository.delete({ customerId });
    }
}

export default FavoriteProductsRepository;
