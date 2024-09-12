import { Request, Response, Router } from "express";
import { ProductStore } from "../database";
import { Logger } from "winston";
import { Product } from "../database";

type UpdateProductParams = {
  req: Request;
  res: Response;
  productStore: ProductStore;
  logger: Logger;
}

async function update({ req, res, productStore, logger }: UpdateProductParams) {
  const product = req.body as Product;
  try {
    const products = await productStore.upsert(product);
    return res.status(200).send(products);
  } catch (error) {
    logger.error(`An error happened while updating the product ${product.name}. Error: ${error}`);
    return res.status(500).send({ message: error });
  }
}

export async function updateProduct(productStore: ProductStore, logger: Logger) {
  const updateProductRoutes = Router();
  updateProductRoutes.post('', async (req, res) => await update({ req, res, productStore, logger }));
  updateProductRoutes.put('', async (req, res) => await update({ req, res, productStore, logger }));
  return updateProductRoutes;
}
