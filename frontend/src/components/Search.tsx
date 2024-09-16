import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { ProductCollection } from '../api';
import { useState } from 'react';

type SearchProps = {
  setProducts: (productColletcion: ProductCollection) => void;
  products?: ProductCollection;
};

export function Search({ products, setProducts }: SearchProps) {
  const [filter, setFilter] = useState('');

  const handleOnFilterProducts = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFilter(value);

    if (products) {
      const filteredProducts = Object.entries(products).reduce(
        (acc, [productId, product]) => {
          return {
            ...acc,
            ...(product.name.toLowerCase().includes(value.toLowerCase()) && {
              [productId]: product,
            }),
          };
        },
        {}
      );

      setProducts(filteredProducts);
    }
  };

  const handleOnBlur = () => {
    if (products) {
      setFilter('');
      setProducts(products);
    }
  };

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
        value={filter}
        onChange={handleOnFilterProducts}
        onBlur={handleOnBlur}
      />
    </FormControl>
  );
}
