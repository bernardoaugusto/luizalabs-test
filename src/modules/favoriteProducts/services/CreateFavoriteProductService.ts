import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import GetProductByIdService from '../../products/services/GetProductByIdService';
import ICreateFavoriteProductDTO from '../dtos/ICreateFavoriteProductDTO';
import FavoriteProduct from '../infra/typeorm/entities/FavoriteProduct';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

@injectable()
export default class CreateFavoriteProductService {
    constructor(
        @inject('FavoriteProductsRepository')
        private favoriteProductsRepository: IFavoriteProductsRepository,

        @inject('GetProductByIdService')
        private validateProductExists: GetProductByIdService,
    ) {}

    public async execute({
        customerId,
        productId,
    }: ICreateFavoriteProductDTO): Promise<FavoriteProduct> {
        const checProductIsAlreadyInFavorites =
            await this.favoriteProductsRepository.findByCustomerIdAndProductId(
                customerId,
                productId,
            );

        if (checProductIsAlreadyInFavorites)
            throw new AppError('The product is already in favorites');

        await this.validateProductExists.execute(productId);

        const favoriteProduct = new FavoriteProduct();
        Object.assign(favoriteProduct, {
            customerId,
            productId,
        });

        return this.favoriteProductsRepository.create(favoriteProduct);
    }
}
