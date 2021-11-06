import { Segments, celebrate } from 'celebrate';

import CustomersController from '../controllers/CustomersController';
import { Router } from 'express';
import configValidateRoute from '../../../../../config/route';
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

export default customersRouter;
