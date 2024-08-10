import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export function Root(): ReactElement {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography>Recipe Helper</Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
