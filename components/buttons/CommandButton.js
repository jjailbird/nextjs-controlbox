import { withStyles } from "@mui/styles";
import { Button } from '@mui/material';

const CommandButton = withStyles({
  root: props => ({
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background: props.background,
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 450,
    width: 200,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  })
})((props) => (<Button {...props} />));

export default CommandButton;
