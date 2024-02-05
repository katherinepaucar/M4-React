import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "./login.component";

export const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin  = (username: string, password: string) => {
    if (username === "admin" && password === "test") {
      navigate("/list");
    } else {
      alert("User / password not valid, psst... admin / test");
    }
  };

  return <LoginComponent onLogin={handleLogin} />;
};