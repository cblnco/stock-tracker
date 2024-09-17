import axios from 'axios';
import { Product, ProductCollection } from './types';

const PRODUCT_BE_URL = 'http://localhost:7000/api/product';

export class ProductClient {
  static async getAll(): Promise<ProductCollection> {
    try {
      const response = await axios({
        method: 'GET',
        url: PRODUCT_BE_URL,
      });

      return response.data || {};
    } catch (error) {
      throw new Error(
        `An error happened while retrieving all products from the database, error: ${error}`
      );
    }
  }

  static async create(product: Product): Promise<void> {
    try {
      await axios({
        method: 'POST',
        url: PRODUCT_BE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...product,
        },
      });
    } catch (error) {
      throw new Error(
        `An error happened while creating the Product "${product.id}: ${product.name} - ${error}`
      );
    }
  }

  static async update(product: Product): Promise<void> {
    try {
      await axios({
        method: 'PUT',
        url: PRODUCT_BE_URL,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          ...product,
        },
      });
    } catch (error) {
      throw new Error(
        `An error happened while creating the Product "${product.id}: ${product.name} - ${error}`
      );
    }
  }

  static async delete(productId: string): Promise<void> {
    try {
      await axios({
        method: 'DELETE',
        url: `${PRODUCT_BE_URL}/id/${productId}`,
      });
    } catch (error) {
      throw new Error(
        `An error happened while deleting the Product id: ${productId}`
      );
    }
  }
}
