import { Router } from 'express';
import customersRouter from '../../../../modules/customers/infra/http/routes/customers.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import favoriteProductsRouter from '../../../../modules/favoriteProducts/infra/http/routes/favoriteProducts.routes';
import sessionsRouter from '../../../../modules/customers/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/api/customers', customersRouter);
routes.use('/api/sessions', sessionsRouter);
routes.use('/api/favoriteProducts', ensureAuthenticated, favoriteProductsRouter);

export default routes;
