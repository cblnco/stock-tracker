import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Product } from './types';

export type ProductCardProps = {
  product: Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
};

type ProductFormProps = {
  product: Product;
  handleOnChange: (product: Partial<Product>) => void;
};

type ProductLabelProps = {
  product: Product;
};

const ProductForm = ({ product, handleOnChange }: ProductFormProps) => {
  const { name, price, description, stock } = product;
  const fieldStyle = {
    marginBottom: '0.6rem',
  };

  return (
    <>
      <TextField
        sx={fieldStyle}
        id="product-name"
        variant="standard"
        value={name}
        onChange={e => handleOnChange({ name: e.target.value })}
      />
      <TextField
        id="product-price"
        type="number"
        variant="standard"
        sx={{ width: '30%', ...fieldStyle }}
        value={price}
        onChange={e => handleOnChange({ price: Number(e.target.value) })}
      />
      <TextField
        id="product-description"
        multiline
        rows={2}
        sx={fieldStyle}
        value={description}
        variant="standard"
        onChange={e => handleOnChange({ description: e.target.value })}
      />
      <TextField
        id="product-stock"
        type="number"
        sx={{ width: '30%', ...fieldStyle }}
        variant="standard"
        value={stock}
        onChange={e => handleOnChange({ stock: Number(e.target.value) })}
      />
    </>
  );
};

const ProductLabels = ({ product }: ProductLabelProps) => {
  const { name, price, description, stock } = product;
  return (
    <>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', marginBottom: '0.5rem' }}
      >
        {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: 'text.secondary', marginBottom: '1rem' }}
      >
        ${Number(price).toFixed(2)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          minHeight: '6rem',
        }}
      >
        {description}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        In stock: {stock}
      </Typography>
    </>
  );
};

export const ProductCard = ({
  product,
  updateProduct,
  deleteProduct,
}: ProductCardProps) => {
  const [productData, setProductData] = useState<Product>(product);
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [isOutOfStock, setIsOutOfStock] = useState(productData.stock <= 0);

  const handleOnChange = (data: Partial<Product>) => {
    setProductData(prevState => ({ ...prevState, ...data }));
  };

  const handleOnSave = () => {
    setIsEditEnabled(false);
    setIsOutOfStock(productData.stock <= 0);
    updateProduct(productData);
  };

  const handleOnCancel = () => {
    setIsEditEnabled(false);
    setProductData(product);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'fix-content',
      }}
    >
       {
         isOutOfStock && (<Typography
          variant="body2"
          sx={{
            color: 'text.main',
            position: 'absolute',
            zIndex: '10',
            fontSize: '2rem',
            paddingTop: '5rem',
            paddingLeft: '0.6rem',
            paddingRight: '0.6rem',
          }}
        >
          [ OUT OF STOCK ]
        </Typography>)
       }
      <CardMedia
        sx={{
          opacity: isOutOfStock ? '17%' : '100%',
        }}
        component="img"
        height="194"
        src={productData.img}
        alt={productData.altdesc}
      />
      <CardContent>
        {isEditEnabled ? (
          <ProductForm product={productData} handleOnChange={handleOnChange} />
        ) : (
          <ProductLabels product={productData} />
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'right' }}>
        {isEditEnabled ? (
          <>
            <IconButton aria-label="cancel" onClick={handleOnCancel}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="save" onClick={handleOnSave}>
              <CheckIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => deleteProduct(productData.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => setIsEditEnabled(true)}
            >
              <ModeEditIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};
