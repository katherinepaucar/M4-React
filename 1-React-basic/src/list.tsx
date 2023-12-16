import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Filter, createEmptyFilter } from "./form/filter.vm";
import { useDebounce } from "use-debounce";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [filter, setFilter] = React.useState<Filter>(createEmptyFilter())
  const [debouncedSearchTerm] = useDebounce(filter, 1000);
  const [isSearching, setIsSearching] = React.useState<string>('');
//`https://api.github.com/orgs/${debouncedSearchTerm}/members
  React.useEffect(() => {

          fetch(`https://api.github.com/orgs/${debouncedSearchTerm.org}/members`)
          .then((response) => response.json())
          .then((res) => setMembers(res))
          .catch((err)=> console.log(err));



  }, [isSearching]);

const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSearching(debouncedSearchTerm.org);
}
const updateFieldValue = (name: keyof Filter) => ( e ) =>{
  setFilter({
    [name]: e.target.value
  })
 //  console.log('updateFieldValue e')

}
  
  return (
    <>
      <h2>Hello from List page</h2>
      <form  className="form" onSubmit={handleSubmit}>
        <input 
        type="text"
        value={filter.org}
        required
        onChange={updateFieldValue('org')}/> 
        <button >Filtrar por organización</button>
      </form>

      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members && members.length> 0 && members.map((member) => (
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

