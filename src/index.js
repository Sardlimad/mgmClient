import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthProvider";
import AppRouter from "./Router/AppRouter";
import businessTheme from "./Themes/bussinessTheme";

ReactDOM.render(
  <ThemeProvider theme={businessTheme}>
    <CssBaseline />
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
