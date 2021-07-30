import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import axios from "axios";
import {
  Button,
  // Input,
  //InputLabel,
  TextField,
  Card,
  CardActions,
  CardContent,
  //CardHeader,
  Grid,
  //Paper,
  // AppBar,
  Typography,
  //Toolbar,
  //Link,
  //FormControl
} from "@material-ui/core";

import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(0.1), //grid padding
    textAlign: "center",
    backgroundColor: "cyan",
    backgroundImage: `url(https://via.placeholder.com/100x200)`,
    backgroundSize: "cover",
  },
  title: {
    color: "white",
    backgroundColor: "black",
  },
  form: {
    backgroundColor: "white",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function Login(props) {
  const classes = useStyles();
  const usernameref = useRef();
  const PasswordRef = useRef();
  async function submitHandler() {
    const username = usernameref.current.value;
    const password = PasswordRef.current.value;
    if (username === "") {
      alert("Please enter the username");
      return false;
    }
   
    if (password === "") {
      alert("Please enter the password");
      return false;
    }
    
   /* let body = {
      id: null,
      username: username,
      password: password,
    };*/
    props.postLogin(username,password);
    //console.log(JSON.stringify(body));
  }
  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Login Form
          </Typography>
          <form name="form" className={classes.form}>
            <TextField
              //id="standard-basic"
              inputRef={usernameref}
              label="Username"
            />
            <br />
            <TextField
              type="password"
              //id="standard-basic"
              inputRef={PasswordRef}
              label="Password"
            />
          </form>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Login
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
export default Login;
