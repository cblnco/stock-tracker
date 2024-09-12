import { Knex } from 'knex';
import { Logger } from 'winston';
import { Product } from './types';

const PRODUCT_TABLE = 'product_stock';
const MIGRATIONS_DIR = 'migrations';

type WhereClause = { name: string; } | { id: string; };

export class ProductStore {
  private static knex: Knex;

  static async create(
    dbClient: Knex,
    logger: Logger,
  ): Promise<ProductStore> {
    const storeLogger = logger.child({ component: 'ProductStore' });

    if (!this.knex) {
      this.knex = dbClient;

      try {
        await this.knex.migrate.latest({
          directory: MIGRATIONS_DIR,
        });
        storeLogger.info('Successfully ran migrations.');
      } catch (err) {
        storeLogger.info(
          `Failed to migrate to latest schema. Error: ${err}`,
        );
        throw Error(`Knex migrations error: ${err}`);
      }
    }

    return new ProductStore(this.knex, storeLogger);
  }

  constructor(private readonly db: Knex, private readonly logger: Logger) { }

  async get(
    whereClause: WhereClause,
  ): Promise<Product> {
    try {
      const [product] = await this.db<Product>(PRODUCT_TABLE)
        .where(whereClause)
        .select();

      return product;
    } catch (error) {
      throw new Error(
        `An error happened while retrieving the Product "${whereClause}", error: ${error}`,
      );
    }
  }

  async upsert(product: Product): Promise<void> {
    try {
      await this.db<Product>(PRODUCT_TABLE)
        .insert(product)
        .onConflict('id')
        .merge();
    } catch (error) {
      throw new Error(
        `An error happened while updating the Product "${product.id}: ${product.name} - ${error}`,
      );
    }
  }

  async delete(whereClause: WhereClause): Promise<boolean> {
    try {
      const result = await this.db(PRODUCT_TABLE)
        .where(whereClause)
        .delete();

      return result ? true : false;
    } catch (error) {
      throw new Error(
        `An error happened while deleting the requested product: ${error}`,
      );
    }
  }

  async retrieveAll(): Promise<Product[]> {
    try {
      const productRows = await this.db<Product>(PRODUCT_TABLE).select();
      return productRows;
    } catch (error) {
      throw new Error(
        `An error happened while retrieving all the products: ${error}`,
      );
    }
  }
}
