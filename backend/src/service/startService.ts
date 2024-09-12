import express from 'express';
import { getClient, ProductStore } from "../database";
import { logger } from "../utils";
import { createRoutes } from '../routes';

export async function startService() {
  const app = express();
  const port = 7000;

  logger.info('Starting stock-tracker backend');

  const dbClient = await getClient();
  const productStore = await ProductStore.create(dbClient, logger);

  const routes = await createRoutes(productStore, logger);

  app.use('/api/product', routes);

  app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
  });
}
