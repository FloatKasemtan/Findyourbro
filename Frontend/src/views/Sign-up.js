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
import Cookies, { set } from "js-cookie";
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
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [_password, set_password] = useState("");
  const [_passwordR, set_passwordR] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [seniorCode, setSeniorCode] = useState("");
  const register = async () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      username !== "" &&
      password !== "" &&
      _password !== "" &&
      studentId !== "" &&
      seniorCode !== ""
    ) {
      if (password == _password) {
        const res = await axios.post("http://localhost:8080/auth/sign-up", {
          student_id: studentId,
          firstName: firstName,
          lastName: lastName,
          _user: username,
          _pass: password,
          pairingCode: seniorCode,
        });
        if (res.data.respond == "1001") {
          swal("Register done!", "", "success");
          setTimeout(() => {
            history.push("/");
          }, 2000);
        } else if (res.data.respond == "1004") {
          swal("No one own this code", "please check your typing!", "error");
        } else if (res.data.respond == "1002") {
          swal("Server error please contract support", "", "error");
        }
      } else {
        document.getElementById("_password").value = "";
        set_passwordR(true);
      }
    } else {
      swal("Please enter all required data!", "", "warning");
    }
  };
  return (
    <div>
      <img
        style={{
          position: "fixed",
          width: "60%",
          height: "auto",
          top: 0,
          right: 0,
          pointerEvents: "none",
          zIndex: -999,
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
                    autoFocus
                    variant="outlined"
                    required
                    name="studentId"
                    onChange={(e) => setStudentId(e.target.value)}
                    label="Student ID"
                    type="number"
                    id="studentId"
                  />
                </Grid>
                <Grid item xs="4">
                  <TextField
                    variant="outlined"
                    required
                    name="SeniorCode"
                    onInput={(e) => {
                      e.target.value = e.target.value.slice(0, 6);
                    }}
                    onChange={(e) => setSeniorCode(e.target.value)}
                    label="Senior Code"
                    type="text"
                  />
                </Grid>
              </Grid>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                onChange={(e) => setusername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Firstname"
                onChange={(e) => setfirstName(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Lastname"
                onChange={(e) => setlastName(e.target.value)}
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
                error={_passwordR}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => set_password(e.target.value)}
                label="Re-enter your password"
                type="password"
                id="_password"
                autoComplete="current-password"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={register}
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
          height: "auto",
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
