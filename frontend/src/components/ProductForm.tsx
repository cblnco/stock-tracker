import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { nanoid } from 'nanoid';
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Box,
} from '@mui/material';
import { Product } from './types';

interface ProductFormProps {
  onProductUpdate: (product: Product) => void;
}

type ProductData = {
  name: string;
  price: number;
  img: string;
  description: string;
  stock: number;
  altdesc: string;
};

const boxStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: { xs: 'start', md: 'center' },
  gap: 4,
  overflow: 'auto',
};

export const ProductForm = ({ onProductUpdate }: ProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalState = (state: boolean) => setIsOpen(state);

  return (
    <>
      <IconButton
        aria-label="add product"
        onClick={() => handleModalState(true)}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        open={isOpen}
        fullWidth
        maxWidth="xs"
        onClose={() => handleModalState(false)}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
              (formData as any).entries()
            ) as ProductData;
            handleModalState(false);
            onProductUpdate({
              id: nanoid(15),
              ...formJson,
            });
          },
        }}
      >
        <DialogTitle>Register a new product</DialogTitle>
        <DialogContent>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '70%',
              }}
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              variant="standard"
            />
          </Box>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '40%',
              }}
              autoFocus
              required
              margin="dense"
              type="number"
              id="price"
              name="price"
              label="Price"
              variant="standard"
            />
          </Box>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '90%',
              }}
              autoFocus
              required
              margin="dense"
              type="text"
              id="img"
              name="img"
              label="Product image url"
              variant="standard"
            />
          </Box>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '85%',
              }}
              autoFocus
              required
              margin="dense"
              type="text"
              id="altdesc"
              name="altdesc"
              label="Image description"
              variant="standard"
            />
          </Box>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '75%',
              }}
              autoFocus
              required
              margin="dense"
              id="description"
              name="description"
              label="Product description"
              type="text"
              variant="standard"
            />
          </Box>
          <Box sx={boxStyle}>
            <TextField
              sx={{
                marginBottom: '1rem',
                width: '40%',
              }}
              autoFocus
              required
              margin="dense"
              id="stock"
              name="stock"
              label="Stock"
              type="number"
              variant="standard"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleModalState(false)}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
