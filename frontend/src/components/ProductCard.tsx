import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { TextField } from '@mui/material';
import Textarea from './TextArea';

export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  description: string;
  stock: number;
  warningThreshold: number;
  altdesc?: string;
};

const ProductForm = ({ name, price, description, stock }: Partial<Product>) => {
  const [product, setProduct] = useState({});
  return (
    <>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={name}
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
      />
      <Textarea value={description!} />
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
      />
    </>
  );
};

const ProductLabels = ({
  name,
  price,
  description,
  stock,
}: Partial<Product>) => {
  return (
    <>
      <TextField
        id="standard-basic"
        label="Name"
        variant="standard"
        required
        value={name}
      />
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
  img,
  altdesc = '',
  name,
  price,
  description,
  stock,
}: Product) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" src={img} alt={altdesc} />
      <CardContent>
        {isEditEnabled ? (
          <ProductForm
            name={name}
            price={price}
            description={description}
            stock={stock}
          />
        ) : (
          <ProductLabels
            name={name}
            price={price}
            description={description}
            stock={stock}
          />
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'right' }}>
        <IconButton aria-label="add to favorites">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="share" onClick={() => setIsEditEnabled(true)}>
          <ModeEditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
