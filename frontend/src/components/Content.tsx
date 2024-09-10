import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ProductCard } from './ProductCard';
import products from './products.json';
import { Product } from './types';

type ProductCollection = {
  [key: string]: Product;
};

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function Content() {
  const [productsData, setProductsData] = useState({
    ...products,
  } as ProductCollection);

  const handleOnProductUpdate = (product: Product) => {
    setProductsData(prevState => ({
      ...prevState,
      [product.id]: product,
    }));
  };

  const handleOnProductDelete = (productId: string) => {
    console.log(productId);
    setProductsData(prevState => {
      const updatedProducts = { ...prevState };
      delete updatedProducts[productId];

      console.log(updatedProducts);
      return updatedProducts;
    });
  };

  return (
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
          <Search />
          <IconButton aria-label="edit">
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
        {Object.entries(productsData).map(([productId, product]) => (
          <Grid size={{ xs: 3 }}>
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
  );
}
