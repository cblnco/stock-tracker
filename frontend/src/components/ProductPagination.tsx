import { Pagination } from '@mui/material';
import { ProductCollection } from '../api';

type ProductPaginationProps = {
  postsPerPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  products?: ProductCollection;
};

export default function ProductPagination({
  products,
  onPageChange,
  postsPerPage,
}: ProductPaginationProps) {
  const length = Object.entries(products || {}).length;

  return (
    <Pagination
      hidePrevButton
      hideNextButton
      count={Math.ceil(length / postsPerPage)}
      boundaryCount={5}
      onChange={onPageChange}
    />
  );
}
