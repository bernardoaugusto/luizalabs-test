import '../../modules/customers/providers';

import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import FavoriteProductsRepository from '../../modules/favoriteProducts/infra/typeorm/repositories/FavoriteProductsRepository';
import GetProductByIdService from '../../modules/products/services/GetProductByIdService';
import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';
import IFavoriteProductsRepository from '../../modules/favoriteProducts/repositories/IFavoriteProductsRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomersRepository>(
    'CustomersRepository',
    CustomersRepository,
);

container.registerSingleton<IFavoriteProductsRepository>(
    'FavoriteProductsRepository',
    FavoriteProductsRepository,
);

container.registerSingleton<GetProductByIdService>(
    'GetProductByIdService',
    GetProductByIdService,
);
