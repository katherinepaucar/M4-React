import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Filter, MemberEntity, createEmptyFilter } from "./models";
import { SearchContext } from "./context/search.context";

export const ListPage: React.FC = () => {
  const {searchValue, setNewValue } =  React.useContext(SearchContext);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [searchForm, setSearchForm] = React.useState<Filter>(createEmptyFilter(searchValue));
  const [debouncedSearchTerm] = useDebounce(searchForm, 1000);
  React.useEffect(() => {
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
      <h2>Hello from List page</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchForm.org}
          required
          onChange={updateFieldValue("org")}
        />
        <button>Filtrar por organización</button>
      </form>

      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members &&
          members.length > 0 &&
          members.map((member) => (
            <React.Fragment key={member.id}>
              <img src={member.avatar_url} />
              <span>{member.id}</span>
              <Link to={`/detail/${member.login}`}>{member.login}</Link>
            </React.Fragment>
          ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
