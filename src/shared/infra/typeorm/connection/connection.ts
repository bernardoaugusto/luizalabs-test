import { Connection, createConnections } from 'typeorm';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default async (isTesting = false): Promise<Connection[]> => {
    if (isTesting) {
        const connections = await createConnections([
            {
                name: 'default',
                type: 'sqlite',
                database: path.resolve(__dirname, '..', 'db.sqlite3'),
                migrationsRun: isTesting,
                synchronize: isTesting,
                entities: [`./src/modules/**/infra/typeorm/entities/*.{ts,js}`],
            },
        ]);

        for (let index = 0; index < connections.length; index += 1) {
            await connections[index].runMigrations();
        }

        return connections;
    }

    return createConnections([
        {
            name: 'default',
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'luizalabs',
            entities: [
                `./${
                    process.env.NODE_ENV === 'production' ? 'dist' : 'src'
                }/modules/**/infra/typeorm/entities/*.{ts,js}`,
            ],
            migrations: [
                `./${
                    process.env.NODE_ENV === 'production' ? 'dist' : 'src'
                }/shared/infra/typeorm/{migrations,seed}/*.{ts,js}`,
            ],
            cli: {
                migrationsDir: `./${
                    process.env.NODE_ENV === 'production' ? 'dist' : 'src'
                }/shared/infra/typeorm/migrations`,
            },
        },
    ]);
};
