import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
export interface Props {
  pageSize: number;
  totalElement: number;
  search: string;
  defaultPage: number;
  updateData: (data) => void;
}
export const BasicPagination: React.FC<Props> = (props) => {
  const { pageSize, totalElement, defaultPage, search, updateData } = props;
  const [currentPage, setcurrentPage] = React.useState(defaultPage);
  const total = Math.ceil(totalElement / pageSize);
  const [pagination, setPagination] = React.useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  React.useEffect(() => {
    setcurrentPage(defaultPage);
    setPagination({
      ...pagination,
      from: 0,
      to: pageSize,
    });
  }, [search]);
  React.useEffect(() => {
    updateData(pagination);
  }, [pagination.from, pagination.to]);

  const handleChange = (event, page) => {
    setcurrentPage(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({
      ...pagination,
      from: from,
      to: to,
    });
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={total}
        color="primary"
        page={currentPage}
        onChange={handleChange}
      />
    </Stack>
  );
};
