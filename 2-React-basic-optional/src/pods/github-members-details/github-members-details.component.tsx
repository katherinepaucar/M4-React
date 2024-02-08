import React from "react";
import { Link, useParams } from "react-router-dom";

export const MemberDetailComponent: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <div className="container">
        <h2>Hello from Detail page</h2>
        <h3>User Id: {id}</h3>
        <Link to="/list">Back to list page</Link>
      </div>
    </>
  );
};
