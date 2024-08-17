import { Box, Button } from "@mui/material";
import { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export function Home(): ReactElement {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box>
      <Button sx={{ m: 1 }} onClick={() => loginWithRedirect()}>
        Login
      </Button>
      <Button sx={{ m: 1 }} component={RouterLink} to="/new/recipe">
        Add Recipe
      </Button>
    </Box>
  );
}
