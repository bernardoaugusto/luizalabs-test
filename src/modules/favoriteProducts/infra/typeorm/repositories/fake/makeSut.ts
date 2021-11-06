import FavoriteProduct from '../../entities/FavoriteProduct';
import FavoriteProductsRepository from '../FavoriteProductsRepository';
import { makeSut as makeCustomer } from '../../../../../customers/infra/typeorm/repositories/fake/makeSut';
import { v4 as uuid } from 'uuid';

export const makeSut = async (
    favoriteProductData?: Partial<FavoriteProduct>,
): Promise<FavoriteProduct> => {
    const customer = await makeCustomer();

    const favoriteProductsRepository = new FavoriteProductsRepository();
    const sut = new FavoriteProduct();
    Object.assign(
        sut,
        {
            customerId: customer.id,
            productId: uuid(),
        },
        favoriteProductData,
    );

    return favoriteProductsRepository.create(sut);
};
