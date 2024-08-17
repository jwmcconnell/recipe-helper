import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function Root(): ReactElement {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  console.log({ user, isAuthenticated });
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h1" sx={{ fontSize: 36 }}>
              Recipe Helper
            </Typography>
            {isAuthenticated && user ? (
              <>
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src={user.picture} alt={user.name} />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={() => logout()}>
                    <Typography>Log Out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button sx={{ m: 1 }} onClick={() => loginWithRedirect()}>
                Login
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
