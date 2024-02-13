import React from "react";
import { Button, TextField } from "@mui/material";
import { Filter, createEmptyFilter } from "./filter";
import { BasicPagination, MemberList } from "./components";
import "./github-members-list.styles.css";
import { MemberEntity } from "./github-members-list.vm";
import { PaginationData, SplitData } from "./pagination";

interface Props {
  members: MemberEntity[];
  error: string;
  infoPagination: PaginationData;
  searchValue: string;
  setSearchValue: (value: string) => void;
  setNewPagination: (newValue: SplitData) => void;
}

export const MemberListComponent: React.FC<Props> = (props) => {
  const {
    members,
    error,
    infoPagination,
    setNewPagination,
    searchValue,
    setSearchValue,
  } = props;
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
    };
  const updateData = (data) => {
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
