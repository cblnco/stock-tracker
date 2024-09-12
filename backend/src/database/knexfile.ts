import Knex from 'knex';
import { logger } from '../utils';

const POSTGRES_PORT = 5432;
const POSTGRES_DATABASE = 'stock-tracker';
const POSTGRES_HOST = "localhost";
const POSTGRES_PASSWORD = "postgres";
const POSTGRES_USER = "postgres";


interface KnexConfig {
  client: string;
  connection: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
  pool: {
    min: number;
    max: number;
  };
}

const knexConfig: KnexConfig = {
  client: 'pg',
  connection: {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
  },
  pool: {
    min: 5,
    max: 8,
  },
};

// async function createStockDb() {
//   const creationClient = Knex(knexConfig);

//   logger.info(`Verifying if "${POSTGRES_DATABASE}" table exists.`);
//   try {
//     logger.info(`Using "${POSTGRES_HOST}" postgres HOST.`);
//     await creationClient.raw(`CREATE DATABASE "${POSTGRES_DATABASE}";`);
//     logger.info(`Successfully created the "${POSTGRES_DATABASE}" database.`);
//   } catch (error) {
//     logger.info(
//       `The "${POSTGRES_DATABASE}" database already exists, skipping its creation.`
//     );
//   } finally {
//     await creationClient.destroy();
//   }
// }

async function getClient() {
  // await createStockDb();
  return Knex(knexConfig);
}

export { getClient };
export default knexConfig;
