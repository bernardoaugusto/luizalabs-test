import { Request, Response, Router } from 'express';

const customersRouter = Router();

customersRouter.post('/', (request: Request, response: Response) => {
    return response.status(201).json({
        message: 'Hello World',
    });
});

export default customersRouter;
