import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { Root } from "./pages/Root/Root.tsx";
import { ErrorPage } from "./pages/Error/Error.tsx";
import { Home } from "./pages/Home/Home.tsx";
import { RecipeEditor } from "./pages/RecipeEditor/RecipeEditor.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new/recipe",
        element: <RecipeEditor />,
      },
    ],
  },
]);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
