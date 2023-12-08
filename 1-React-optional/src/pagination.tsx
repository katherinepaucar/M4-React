import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export interface Props{
pageSize: number;
totalElement: number;
updateData: (data) => void

}
export const BasicPagination: React.FC<Props> = (props) => {
   const {pageSize, totalElement, updateData} = props
   console.log('props', props);
    const total = Math.ceil(totalElement / pageSize);
    const [pagination, setPagination] = React.useState({
        count:0,
        from:0,
        to: pageSize
    });
    React.useEffect(() => {
        updateData(pagination)
      }, [pagination.from, pagination.to]);
 
    const handleChange =(event, page) => {
        // console.log('handleChange page', page)
        const from = (page-1) * pageSize;
        const to = (page-1) *  pageSize +  pageSize;
        console.log('handleChange from', from);
        console.log('handleChange to', to);
        setPagination({
            ...pagination,
            from: from,
            to: to
        });
    }
  return (
    <Stack spacing={2}>
      <Pagination count={total} color="primary" onChange={handleChange} />
    </Stack>
  );
}
