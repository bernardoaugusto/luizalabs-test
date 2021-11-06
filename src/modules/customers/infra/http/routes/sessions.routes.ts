import { Segments, celebrate } from 'celebrate';

import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import configValidateRoute from '../../../../../config/route';
import validateDataOfCreateSession from '../../../common/validations/validateDataOfCreateSession';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
    '/',
    celebrate(
        {
            [Segments.BODY]: validateDataOfCreateSession,
        },
        configValidateRoute,
    ),
    sessionsController.create,
);

export default sessionsRouter;
