import FavoriteProduct from '../entities/FavoriteProduct';
import FavoriteProductsRepository from './FavoriteProductsRepository';
import connection from '../../../../../shared/infra/connection';
import { makeSut as makeCustomer } from '../../../../customers/infra/typeorm/repositories/fake/makeSut';
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
});
