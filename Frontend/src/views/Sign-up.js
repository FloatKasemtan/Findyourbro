import React, { useState, useContext } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import swal from "sweetalert";
import Cookies from "js-cookie";
import axios from "axios";
import { userContext } from "../Contexts/userContext";
import bgTop from "../img/TOP.svg";
import bgBottom from "../img/Bottom.svg";
import { pink } from "@material-ui/core/colors";
import Copyright from "../Components/Copyright";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  btn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    marginTop: 30,
  },
  avatar: {
    backgroundColor: pink[200],
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    position: "fixed",
    top: 30,
    left: 200,
    transform: "scale(2)",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const { reload } = useContext(userContext);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const login = async () => {
    if (username !== "" && password !== "") {
      const res = await axios.post("http://localhost:8080/auth/sign-in", {
        _user: username,
        _pass: password,
      });

      if (res.data.respond == "1001") {
        //Success
        await Cookies.set("token", res.data.token);
        reload();
        history.push("/about");
      } else if (res.data.respond == "1003") {
        //Wrong User or Pass
        swal("Wrong username or password", "", "warning");
      } else if (res.data.respond == "1002") {
        //Server Error
        swal("Server error please contract support", "", "error");
      }
    } else {
      swal("Please enter your infomation", "", "warning");
    }
  };
  return (
    <div>
      <img
        style={{
          position: "fixed",
          width: "60%",
          height: 'auto',
          top: 0,
          right: 0,
          pointerEvents: "none",
        }}
        src={bgTop}
      />
      <div className={classes.logo}>
        <Avatar variant="rounded" className={classes.avatar}>
          {/* <ContactSupportIcon /> */}???
        </Avatar>
        GUESS YOUR SENIOR
      </div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <h1>Sign-up</h1>
          <Grow in timeout={500}>
            <form className={classes.form} noValidate>
              <Grid container>
                <Grid item xs="8">
                  <TextField
                    variant="outlined"
                    required
                    name="password"
                    onChange={(e) => setpassword(e.target.value)}
                    label="Student ID"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs="4">
                  <TextField
                    variant="outlined"
                    required
                    name="password"
                    onChange={(e) => setpassword(e.target.value)}
                    label="Senior Code"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Firstname"
                autoFocus
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Lastname"
                autoFocus
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setpassword(e.target.value)}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={login}
                className={classes.btn}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    {"Back to Sign-in"}
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </form>
          </Grow>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <img
        style={{
          position: "fixed",
          width: "60%",
          height: 'auto',
          bottom: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: -999,
        }}
        src={bgBottom}
      />
    </div>
  );
}
