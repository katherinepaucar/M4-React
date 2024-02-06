import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import './login.styles.css'
interface Props {
    onLogin: (username: string, password: string) => void;
  }
  
export const LoginComponent: React.FC<Props> = (props) => {
  const { onLogin } = props
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleNavigation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <>
      <div className="formLogin">
        <form onSubmit={handleNavigation}>
          <h2>Hello from login page</h2>

          <div>
            <div>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{ mt: 1 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                sx={{ mt: 1 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button sx={{ mt: 1 }} variant="contained" type="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
