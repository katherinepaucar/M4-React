import React from "react";
import { Link } from "react-router-dom";
import { Filter, MemberEntity, createEmptyFilter } from "./models";
import { SearchContext } from "./context/search.context";
import {
  Button,
  TextField,
} from "@mui/material";
import { BasicPagination } from "./pagination";
import { MemberList } from "./member-list";


export const ListPage: React.FC = () => {
  const { searchValue, setNewValue } = React.useContext(SearchContext);
  const [searchForm, setSearchForm] = React.useState<Filter>(
                                    createEmptyFilter(searchValue)
                                  );
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [error, setError] = React.useState(null);
  const perPage = 5;
  const defaultPage= 1;
  const [totalElement, setTotalElement] = React.useState<number>(0);
  const [newData, setNewData] = React.useState({
    from: 0,
    to: perPage,
  });
  React.useEffect(() => {
    //https://api.github.com/orgs/${searchForm.org}/members
    fetch(`https://api.github.com/orgs/${searchForm.org}/members`)
      .then(handleError)
      .then((res) => getData(res, newData.from, newData.to))
      .catch((err) => {
        console.log(err);
        setError('Ha ocurrido un error');
        setMembers([]);
        setTotalElement(0);
      });
  }, [searchValue, newData.from, newData.to]);

  const handleError = response => {
    if (!response.ok) { 
        throw Error(response.statusText);
    } else {
        return response.json();
    }
  }; 
  const getData = (res: MemberEntity[], from: number, to: number) => {
    /*console.log("from", from);
    console.log("to", to);*/
    if (res as MemberEntity[]) {
      const data = res.slice(from, to);
      setMembers(data);
      setTotalElement(res.length);
      if(error){
        setError(null);
      }

    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewValue(searchForm.org);
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
        {error && <p className="text-error">{error}</p>}
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
