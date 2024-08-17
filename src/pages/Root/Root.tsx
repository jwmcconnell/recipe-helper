import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function Root(): ReactElement {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h1" sx={{ fontSize: 36 }}>
            Recipe Helper
          </Typography>

          <Button sx={{ m: 1 }} onClick={() => loginWithRedirect()}>
            Login
          </Button>

          <Button sx={{ m: 1 }} onClick={() => logout()}>
            Log Out
          </Button>

          {isAuthenticated && user && (
            <div>
              <img src={user.picture} alt={user.name} />
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
