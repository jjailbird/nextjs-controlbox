import { RecoilRoot } from "recoil";
import '../styles/reset.css'
import '../styles/globals.scss';

// import { ThemeProvider } from "@mui/material";
// import { theme } from "../utils/theme";
import CssBaseline from "@mui/material/CssBaseline";


function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </ RecoilRoot>
    // <ThemeProvider theme={theme}>
    //   <Component {...pageProps} />
    // </ThemeProvider>
  );
}

export default App
