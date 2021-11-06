import { Segments, celebrate } from 'celebrate';

import FavoriteProductsController from '../controllers/FavoriteProductsController';
import { Router } from 'express';
import configValidateRoute from '../../../../../config/route';
import validateIdSchema from '../../../../../shared/common/validations/validateId';

const favoriteProductsRouter = Router();
const favoriteProductsController = new FavoriteProductsController();

favoriteProductsRouter.patch(
    '/create/:id',
    celebrate(
        {
            [Segments.PARAMS]: validateIdSchema,
        },
        configValidateRoute,
    ),
    favoriteProductsController.create,
);

favoriteProductsRouter.get('/', favoriteProductsController.get);

export default favoriteProductsRouter;
