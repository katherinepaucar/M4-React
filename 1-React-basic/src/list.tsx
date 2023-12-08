import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from 'use-debounce';

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [filter, setFilter] = React.useState<string>('lemoncode');
  const [valueFilter] = useDebounce(filter, 1000);
//` https://api.github.com/orgs/${filter}/members
  React.useEffect(() => {
    fetch(`${filter}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, []);
const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log('value', valueFilter);

}
  
  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <form  className="form" onSubmit={handleSubmit}>
        <input 
        type="text"
        value={filter}
        required
        onChange={(e) => setFilter((e.target.value).toLocaleLowerCase())}/> 
        <button >Filtrar por organización</button>
      </form>

      <div className="list-user-list-container">
        <span className="list-header">Avatar</span>
        <span className="list-header">Id</span>
        <span className="list-header">Name</span>
        {members.map((member) => (
          <>
            <img src={member.avatar_url} />
            <span>{member.id}</span>
            <Link to={`/detail/${member.login}`}>{member.login}</Link>
          </>
        ))}
      </div>
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
