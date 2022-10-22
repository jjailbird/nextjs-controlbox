import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fcba03",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "linear-pink" },
          style: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            borderRadius: 10,
            border: 0,
            color: "white",
            height: 800,
            width: 350,
            padding: "0 30px",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          }
        },
        {
          props: { variant: "linear-blue" },
          style: {
            background: "linear-gradient(45deg, #1a242b 30%, #27465c 90%)",
            borderRadius: 10,
            border: 0,
            color: "white",
            height: 800,
            width: 350,
            padding: "0 30px",
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
          }
        }
      ]
    }
  }
});
