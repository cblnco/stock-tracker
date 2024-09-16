import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { ProductClient, ProductCollection } from '../api';
import { ProductForm } from './ProductForm';
import { Search } from './Search';

export default function Content() {
  const [fullProducts, setFullProducts] = useState<
    ProductCollection | undefined
  >(undefined);
  const [productsData, setProductsData] = useState<
    ProductCollection | undefined
  >(undefined);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductClient.getAll();
      setFullProducts(products);
      setProductsData(products);
    };

    fetchProducts().catch(console.error);
  }, []);

  const handleOnProductUpdate = async (product: Product) => {
    setProductsData(prevState => ({
      ...prevState,
      [product.id]: product,
    }));
    await ProductClient.update(product);
  };

  const handleOnProductDelete = async (productId: string) => {
    setProductsData(prevState => {
      const updatedProducts = { ...prevState };
      delete updatedProducts[productId];
      return updatedProducts;
    });
    await ProductClient.delete(productId);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 4,
            overflow: 'auto',
          }}
        >
          <Typography gutterBottom>Current products</Typography>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              gap: 1,
              width: { xs: '100%', md: 'fit-content' },
              overflow: 'auto',
            }}
          >
            <Search products={fullProducts} setProducts={setProductsData} />
            <ProductForm onProductUpdate={handleOnProductUpdate} />
          </Box>
        </Box>
        <Grid container spacing={2} columns={12}>
          {productsData &&
            Object.entries(productsData).map(([productId, product]) => (
              <Grid key={`${productId}-grid`} size={{ xs: 3 }}>
                <ProductCard
                  key={productId}
                  product={product}
                  updateProduct={handleOnProductUpdate}
                  deleteProduct={handleOnProductDelete}
                />
              </Grid>
            ))}
        </Grid>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
          <Pagination
            hidePrevButton
            hideNextButton
            count={10}
            boundaryCount={10}
          />
        </Box>
      </Box>
    </>
  );
}
