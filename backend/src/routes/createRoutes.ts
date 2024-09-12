import express from 'express';
import { getProduct } from './getProduct';
import { ProductStore } from '../database';
import { Logger } from 'winston';
import { updateProduct } from './updateProduct';
import { deleteProduct } from './deleteProduct';

export async function createRoutes(productStore: ProductStore, logger: Logger) {
  const routes = express.Router();

  routes.use(await getProduct(productStore, logger));
  routes.use(await updateProduct(productStore, logger));
  routes.use(await deleteProduct(productStore, logger));

  return routes;
}