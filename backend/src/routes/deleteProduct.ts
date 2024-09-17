import { Router } from 'express';
import { ProductStore } from '../database';
import { Logger } from 'winston';

export async function deleteProduct(
  productStore: ProductStore,
  logger: Logger
) {
  const getProductRoutes = Router();

  getProductRoutes.delete('/id/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await productStore.delete({ id: productId });
      logger.info(`Deleted the product id ${productId}`);
      return product
        ? res.status(200).send({
            message: `successfully removed the product Id: ${productId}.`,
          })
        : res
            .status(404)
            .send({ message: `The product id ${productId} was not found` });
    } catch (error) {
      logger.error(
        `An error happened while removing the product Id ${productId}. Error: ${error}`
      );
      return res.status(500).send({ message: error });
    }
  });

  getProductRoutes.delete('/name/:productName', async (req, res) => {
    const { productName } = req.params;

    try {
      const product = await productStore.delete({ name: productName });
      logger.info(`Deleted the product id ${productName}`);
      return product
        ? res.status(200).send({
            message: `successfully removed the product: ${productName}.`,
          })
        : res
            .status(404)
            .send({ message: `The product ${productName} was not found` });
    } catch (error) {
      logger.error(
        `An error happened while removing the product ${productName}. Error: ${error}`
      );
      return res.status(500).send({ message: error });
    }
  });

  return getProductRoutes;
}
