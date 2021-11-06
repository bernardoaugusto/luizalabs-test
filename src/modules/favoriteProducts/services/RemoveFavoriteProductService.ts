import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import IRemoveFavoriteProductDTO from '../dtos/IRemoveFavoriteProductDTO';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

@injectable()
export default class RemoveFavoriteProductService {
    constructor(
        @inject('FavoriteProductsRepository')
        private favoriteProductsRepository: IFavoriteProductsRepository,
    ) {}

    public async execute({
        customerId,
        productId,
    }: IRemoveFavoriteProductDTO): Promise<void> {
        const checProductIsAlreadyInFavorites =
            await this.favoriteProductsRepository.findByCustomerIdAndProductId(
                customerId,
                productId,
            );

        if (!checProductIsAlreadyInFavorites)
            throw new AppError('The product is not in favorites');

        return this.favoriteProductsRepository.removeByCustomerIdAndProductId(
            customerId,
            productId,
        );
    }
}
