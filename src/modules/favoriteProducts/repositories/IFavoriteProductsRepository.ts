import FavoriteProduct from '../infra/typeorm/entities/FavoriteProduct';

export default interface IFavoriteProductsRepository {
    create(customer: FavoriteProduct): Promise<FavoriteProduct>;
    findByCustomerIdAndProductId(
        customerId: string,
        productId: string,
    ): Promise<FavoriteProduct | undefined>;
}
