import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { ProductCard } from './ProductCard';
import { Product } from './types';
import { ProductClient, ProductCollection } from '../api';
import { ProductForm } from './ProductForm';
import { Search } from './Search';
import ProductPagination from './ProductPagination';

const PAGE_SIZE = 12;

export default function Content() {
  const [fullProducts, setFullProducts] = useState<
    ProductCollection | undefined
  >(undefined);

  const [productsData, setProductsData] = useState<
    ProductCollection | undefined
  >(undefined);

  const [pageNumber, setPageNumber] = useState(1);

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

    setFullProducts(prevState => ({
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

    setFullProducts(prevState => {
      const updatedProducts = { ...prevState };
      delete updatedProducts[productId];
      return updatedProducts;
    });

    await ProductClient.delete(productId);
  };

  const handleOnPageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
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
          <Typography gutterBottom>Current products:</Typography>
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
          {Object.entries(productsData || {}).length
            ? Object.entries(productsData!)
                .slice((pageNumber - 1) * PAGE_SIZE, pageNumber * PAGE_SIZE)
                .map(([productId, product]) => (
                  <Grid key={`${productId}-grid`} size={{ xs: 3 }}>
                    <ProductCard
                      key={productId}
                      product={product}
                      updateProduct={handleOnProductUpdate}
                      deleteProduct={handleOnProductDelete}
                    />
                  </Grid>
                ))
            : 'No results found...'}
        </Grid>
        <Box
          sx={{
            justifyContent: 'flex-end',
            display: 'flex',
            flexDirection: 'row',
            pt: 4,
          }}
        >
          <ProductPagination
            products={productsData}
            postsPerPage={PAGE_SIZE}
            onPageChange={handleOnPageChange}
          />
        </Box>
      </Box>
    </>
  );
}
