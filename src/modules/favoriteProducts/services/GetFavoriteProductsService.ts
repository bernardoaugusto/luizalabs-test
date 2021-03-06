import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IProductDTO } from '../../products/dtos/IProductDTO';
import GetProductByIdService from '../../products/services/GetProductByIdService';
import IFavoriteProductsRepository from '../repositories/IFavoriteProductsRepository';

@injectable()
export default class GetFavoriteProductsService {
    constructor(
        @inject('FavoriteProductsRepository')
        private favoriteProductsRepository: IFavoriteProductsRepository,

        @inject('GetProductByIdService')
        private getProductByIdService: GetProductByIdService,
    ) {}

    public async execute(customerId: string): Promise<Array<IProductDTO>> {
        const favoriteProducts =
            await this.favoriteProductsRepository.findAllFavoriteProductsByCustomerId(
                customerId,
            );

        return Promise.all(
            favoriteProducts.map(product => {
                return this.getProductByIdService.execute(product.productId);
            }),
        );
    }
}
