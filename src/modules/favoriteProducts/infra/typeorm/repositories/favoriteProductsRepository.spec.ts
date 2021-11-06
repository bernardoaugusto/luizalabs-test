import FavoriteProduct from '../entities/FavoriteProduct';
import FavoriteProductsRepository from './FavoriteProductsRepository';
import connection from '../../../../../shared/infra/connection';
import { makeSut as makeCustomer } from '../../../../customers/infra/typeorm/repositories/fake/makeSut';
import { makeSut as makeFavoriteProduct } from './fake/makeSut';
import { v4 as uuid } from 'uuid';

describe('FavoriteProductsRepository', () => {
    let favoriteProductsRepository: FavoriteProductsRepository;

    beforeAll(async () => {
        await connection(true);
        favoriteProductsRepository = new FavoriteProductsRepository();
    });

    it('Should be able to insert a new FavoriteProduct', async () => {
        const customer = await makeCustomer();

        const sut = new FavoriteProduct();
        Object.assign(sut, {
            customerId: customer.id,
            productId: uuid(),
        });

        const { id, ...favoriteProductRes } =
            await favoriteProductsRepository.create(sut);

        expect(id).toBeDefined();
        expect(favoriteProductRes).toEqual(sut);
    });

    it('should be able to return a favoriteProduct by customerId And productId', async () => {
        const sut = await makeFavoriteProduct();

        const foundFavoriteProduct =
            (await favoriteProductsRepository.findByCustomerIdAndProductId(
                sut.customerId,
                sut.productId,
            )) as FavoriteProduct;

        expect(foundFavoriteProduct).toBeTruthy();
        expect(foundFavoriteProduct.id).toBe(sut.id);
    });

    it('should be able to return all favoriteProduct by customerId', async () => {
        const sut = await makeFavoriteProduct();

        const res =
            await favoriteProductsRepository.findAllFavoriteProductsByCustomerId(
                sut.customerId,
            );

        expect(res).toBeTruthy();
        expect(res[0].id).toBe(sut.id);
    });
});
