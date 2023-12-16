import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Filter, MemberEntity, createEmptyFilter } from "./models";
import { SearchContext } from "./context/search.context";
import Pagination from "@mui/material/Pagination";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ListPage: React.FC = () => {
  const { searchValue, setNewValue } = React.useContext(SearchContext);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [searchForm, setSearchForm] = React.useState<Filter>(
    createEmptyFilter(searchValue)
  );
  const [debouncedSearchTerm] = useDebounce(searchForm, 1000);
  React.useEffect(() => {
    //https://api.github.com/orgs/${debouncedSearchTerm.org}/members
    fetch(`https://api.github.com/orgs/${debouncedSearchTerm.org}/members`)
      .then((response) => response.json())
      .then((res) => setMembers(res))
      .catch((err) => console.log(err));
  }, [searchValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewValue(debouncedSearchTerm.org);
  };
  const updateFieldValue =
    (name: keyof Filter) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchForm({
        [name]: e.target.value,
      });
      //  console.log('updateFieldValue e')
    };

  return (
    <>
      <div className="container">
        <h2>Hello from List page</h2>
        <form className="form-list" onSubmit={handleSubmit}>
          <TextField
            id="standard-basic"
            label="Organización"
            variant="standard"
            value={searchForm.org}
            required
            onChange={updateFieldValue("org")}
          />
          <Button variant="contained">Buscar</Button>
        </form>
        <Table sx={{ width: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Avatar</StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members &&
              members.length > 0 &&
              members.map((member) => (
                <StyledTableRow key={member.id}>
                  <StyledTableCell align="center" component="th" scope="row">
                    <img src={member.avatar_url} />
                  </StyledTableCell>
                  <StyledTableCell align="center">{member.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/detail/${member.login}`}>{member.login}</Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        <Pagination count={10} variant="outlined" />
        <Link to="/detail">Navigate to detail page</Link>
      </div>
    </>
  );
};
