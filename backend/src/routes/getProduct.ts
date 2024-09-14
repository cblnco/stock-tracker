import { Router } from 'express';
import { ProductStore } from '../database';
import { Logger } from 'winston';

export async function getProduct(productStore: ProductStore, logger: Logger) {
  const getProductRoutes = Router();

  getProductRoutes.get('', async (_, res) => {
    try {
      const products = await productStore.retrieveAll();
      const productCollection = products.reduce(
        (collection, product) => ({
          ...collection,
          [product.id]: product,
        }),
        {}
      );
      return res.status(200).send(productCollection);
    } catch (error) {
      logger.error(
        `An error happened while retrieving all the products. Error: ${error}`
      );
      return res.status(500).send({ message: error });
    }
  });

  getProductRoutes.get('/id/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productStore.get({ id: productId });
      return product
        ? res.status(200).send(product)
        : res
            .status(404)
            .send({ message: `The product id ${productId} was not found` });
    } catch (error) {
      logger.error(
        `An error happened while retrieving the product Id ${productId}. Error: ${error}`
      );
      return res.status(500).send({ message: error });
    }
  });

  getProductRoutes.get('/name/:productName', async (req, res) => {
    const { productName } = req.params;

    try {
      const product = await productStore.get({ name: productName });
      return product
        ? res.status(200).send(product)
        : res
            .status(404)
            .send({ message: `The product ${productName} was not found` });
    } catch (error) {
      logger.error(
        `An error happened while retrieving the product ${productName}. Error: ${error}`
      );
      return res.status(500).send({ message: error });
    }
  });

  return getProductRoutes;
}
