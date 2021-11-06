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
}

export default FavoriteProductsRepository;
