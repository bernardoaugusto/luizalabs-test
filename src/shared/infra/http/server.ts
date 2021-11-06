import 'reflect-metadata';

import app from './app';
import connection from '../connection';

app.listen(3000, async () => {
    await connection();

    console.log('😁 Server started on port 3000 😁');
});
