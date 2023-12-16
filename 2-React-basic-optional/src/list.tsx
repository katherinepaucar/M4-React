import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Filter, MemberEntity, createEmptyFilter } from "./models";
import { SearchContext } from "./context/search.context";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  styled,
  tableCellClasses,
} from "@mui/material";
import { BasicPagination } from "./pagination";
import { MemberList } from "./member-list";
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
  const [debouncedSearchTerm] = useDebounce(searchForm, 500);
  const [totalElement, setTotalElemenst] = React.useState<number>(0);
  const perPage = 5;
  const defaultPage= 1;
  const [resetP, setResetP] = React.useState<boolean>(false);
  const [newData, setNewData] = React.useState({
    from: 0,
    to: perPage,
  });
  React.useEffect(() => {
    //https://api.github.com/orgs/${debouncedSearchTerm.org}/members
    fetch(`https://api.github.com/orgs/${debouncedSearchTerm.org}/members`)
      .then((response) => response.json())
      .then((res) => getData(res, newData.from, newData.to))
      .catch((err) => console.log(err));
  }, [searchValue, newData.from, newData.to]);

  const getData = (res: MemberEntity[], from: number, to: number) => {
    /*console.log("from", from);
    console.log("to", to);*/
    if (res as MemberEntity[]) {
      const data = res.slice(from, to);
      setMembers(data);
      setTotalElemenst(res.length);
    }
  };

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
  const updateData = (data) => {
    //  console.log("updateData data", data);
    setNewData({
      from: data.from,
      to: data.to,
    });
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
          <Button variant="contained" type="submit">
            Buscar
          </Button>
        </form>
        <MemberList members={members}></MemberList>
        <BasicPagination
          pageSize={perPage}
          totalElement={totalElement}
          defaultPage = {defaultPage}
          search = {searchValue}
          updateData={updateData}
        />
        <Link to="/detail">Navigate to detail page</Link>
      </div>
    </>
  );
};
