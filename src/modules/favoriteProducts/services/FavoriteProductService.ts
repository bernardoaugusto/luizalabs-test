import { injectable, inject } from 'tsyringe';
import ICreateFavoriteProductDTO from '../dtos/ICreateFavoriteProductDTO';
import FavoriteProduct from '../infra/typeorm/entities/FavoriteProduct';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

@injectable()
export default class CreateFavoriteProductService {
    constructor(
        @inject('FavoriteProductsRepository')
        private favoriteProductsRepository: IFavoriteProductsRepository,
    ) {}

    public async execute({
        customerId,
        productId,
    }: ICreateFavoriteProductDTO): Promise<FavoriteProduct> {
        const favoriteProduct = new FavoriteProduct();
        Object.assign(favoriteProduct, {
            customerId,
            productId,
        });

        return this.favoriteProductsRepository.create(favoriteProduct);
    }
}
