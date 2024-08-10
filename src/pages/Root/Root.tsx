import { AppBar, Toolbar, Typography } from "@mui/material";
import { ReactElement } from "react";

export function Root(): ReactElement {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Recipe Helper</Typography>
      </Toolbar>
    </AppBar>
  );
}
