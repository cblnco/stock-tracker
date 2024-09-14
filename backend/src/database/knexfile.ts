import Knex, { Knex as KnexType } from 'knex';
import { logger } from '../utils';

const POSTGRES_PORT = 5432;
const POSTGRES_DATABASE = 'stock-tracker';
const POSTGRES_HOST = 'localhost';
const POSTGRES_PASSWORD = 'postgres';
const POSTGRES_USER = 'postgres';

const MIGRATIONS_DIR = 'migrations';
const SEED_DIR = 'seeds';

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

async function setupDatabase(knex: KnexType) {
  try {
    await knex.migrate.latest({
      directory: MIGRATIONS_DIR,
    });

    await knex.seed.run({
      directory: SEED_DIR,
    });

    logger.info('Successfully ran database migrations and seed data.');
  } catch (error) {
    logger.error(`An error happened while setting upd the database: ${error}`);
    throw Error(`Knex database setup error: ${error}`);
  }
}

async function getClient() {
  const knex = Knex(knexConfig);
  await setupDatabase(knex);
  return knex;
}

export { getClient };
export default knexConfig;
