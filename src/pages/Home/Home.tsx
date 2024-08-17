import { Box, Button } from "@mui/material";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

export function Home(): ReactElement {
  return (
    <Box>
      <Button sx={{ m: 1 }} component={RouterLink} to="/new/recipe">
        Add Recipe
      </Button>
    </Box>
  );
}
