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
import Textarea from './TextArea';
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

  return (
    <>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={name}
        onChange={e => handleOnChange({ name: e.target.value })}
      />
      <TextField
        id="standard-number"
        label="price"
        type="number"
        variant="standard"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        value={price}
        onChange={e => handleOnChange({ price: Number(e.target.value) })}
      />
      <Textarea value={description!} handleOnChange={handleOnChange} />
      <TextField
        id="standard-number"
        label="In Stock"
        type="number"
        variant="standard"
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
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
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        {name}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        ${price}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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

  const handleOnChange = (data: Partial<Product>) => {
    setProductData(prevState => ({ ...prevState, ...data }));
  };

  const handleOnSave = () => {
    setIsEditEnabled(false);
    updateProduct(productData);
  };

  const handleOnCancel = () => {
    setIsEditEnabled(false);
    setProductData(product);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
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
