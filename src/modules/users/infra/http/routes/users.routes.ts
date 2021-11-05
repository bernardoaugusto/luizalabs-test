import { Request, Response, Router } from 'express';

const usersRouter = Router();

usersRouter.post('/', (request: Request, response: Response) => {
    return response.status(201).json({
        message: 'Hello World',
    });
});

export default usersRouter;
