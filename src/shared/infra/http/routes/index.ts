import { Router } from 'express';
import customersRouter from '../../../../modules/customers/infra/http/routes/customers.routes';
import sessionsRouter from '../../../../modules/customers/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/api/customers', customersRouter);
routes.use('/api/sessions', sessionsRouter);

export default routes;
