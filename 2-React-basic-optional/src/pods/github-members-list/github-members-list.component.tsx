import React from "react";
import { Button, TextField } from "@mui/material";
import { Filter, createEmptyFilter } from "./filter";
import { BasicPagination, MemberList } from "./components";
import { SearchMemberContext } from "../../core/provider/github-members/search-member.context";
import './github-members-list.styles.css'



export const MemberListComponent: React.FC = () => {
  const {
    searchValue,
    setSearchValue,
    members,
    error,
    infoPagination,
    setNewPagination,
  } = React.useContext(SearchMemberContext);
  const [searchForm, setSearchForm] = React.useState<Filter>(
    createEmptyFilter(searchValue)
  );


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchValue(searchForm.org);
  };
  const updateFieldValue =
    (field: keyof Filter) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchForm({
        [field]: e.target.value,
      });
      //  console.log('updateFieldValue e')
    };
  const updateData = (data) => {
    //  console.log("updateData data", data);
    setNewPagination({
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
          pageSize={infoPagination.perPage}
          totalElement={infoPagination.totalElement}
          defaultPage={infoPagination.defaultPage}
          search={searchValue}
          updateData={updateData}
        />
      </div>
    </>
  );
};
