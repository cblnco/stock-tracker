import Knex, { Knex as KnexType } from 'knex';
import { logger } from '../utils';

const MIGRATIONS_DIR = 'migrations';
const SEED_DIR = 'seeds';

const {
  TRACKER_POSTGRES_PORT = 5432,
  TRACKER_POSTGRES_DATABASE = 'stock-tracker',
  TRACKER_POSTGRES_HOST = 'localhost',
  TRACKER_POSTGRES_PASSWORD = 'postgres',
  TRACKER_POSTGRES_USER = 'postgres',
} = process.env;

interface KnexConfig {
  client: string;
  connection: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl: {
      rejectUnauthorized: boolean;
    };
  };
  pool: {
    min: number;
    max: number;
  };
}

const knexConfig: KnexConfig = {
  client: 'pg',
  connection: {
    host: TRACKER_POSTGRES_HOST,
    port: TRACKER_POSTGRES_PORT as number,
    user: TRACKER_POSTGRES_USER,
    password: TRACKER_POSTGRES_PASSWORD,
    database: TRACKER_POSTGRES_DATABASE,
    ssl: { rejectUnauthorized: false },
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
