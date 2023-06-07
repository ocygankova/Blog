import { ChangeEvent } from "react";
import { Pagination, PaginationProps } from "@mui/material";

interface IProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
}

function PaginationBar({
  count,
  page,
  onPageChange,
  ...props
}: IProps & PaginationProps) {
  const handlePageItemClicked = (event: ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Pagination
      page={page}
      count={count}
      onChange={handlePageItemClicked}
      variant="outlined"
      shape="rounded"
      showFirstButton
      showLastButton
      {...props}
    />
  );
}

export default PaginationBar;
