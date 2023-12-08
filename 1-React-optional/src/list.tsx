import React from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { BasicPagination } from "./pagination";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const ListPage: React.FC = () => {
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const [filter, setFilter] = React.useState<string>("lemoncode");
  const [valueFilter] = useDebounce(filter, 1000);
  const [sendData, setSendata] = React.useState<string>();
  const [totalElement, setTotalElemenst] = React.useState<number>(null);
  const perPage = 6;
  const [newData, setNewData] = React.useState({
    from: 0,
    to: perPage,
  });

  //` https://api.github.com/orgs/${filter}/members
  // https://api.github.com/orgs/${filter}/members?per_page=${perPage}&&page=${page}
  //s?per_page=4&page=4
  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${filter}/members`)
      .then((response) => response.json())
      .then((res) => getData(res, newData.from, newData.to))
      .catch((err) => console.log(err));
  }, [sendData, newData.from, newData.to]);
  const getData = (res: MemberEntity[], from: number, to:number) => {
    console.log("from", from);
    console.log("to", to);
    if(res as MemberEntity[]){
      const data = res.slice(from, to);
      setMembers(data);
      setTotalElemenst(res.length);
    }

  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendata(valueFilter);
    // console.log("value", valueFilter);
  };
  const updateData = (data) => {
    console.log("updateData data", data);
    setNewData({
      from: data.from,
      to: data.to,
    });
  };

  return (
    <>
      <h2>Hello from List page</h2>+{" "}
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={filter}
          required
          onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())}
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
      <BasicPagination
        pageSize={perPage}
        totalElement={totalElement}
        updateData={updateData}
      />
      <Link to="/detail">Navigate to detail page</Link>
    </>
  );
};
