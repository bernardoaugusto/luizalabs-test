import { Segments, celebrate } from 'celebrate';

import CustomersController from '../controllers/CustomersController';
import { Router } from 'express';
import configValidateRoute from '../../../../../config/route';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import validateDataOfCreateCustomer from '../../../common/validations/validateDataOfCreateCustomer';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: validateDataOfCreateCustomer,
        },
        configValidateRoute,
    ),
    customersController.create,
);

customersRouter.get('/', ensureAuthenticated, customersController.get);

export default customersRouter;
