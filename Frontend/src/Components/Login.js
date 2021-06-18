import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import axios from 'axios';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'GITHUB @ '}
      <Link href="https://github.com/FloatKasemtan/Findyourbro">
        MY REPOSITORY
      </Link>{' '}
      2021.
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const login = async () => {
    const res = await axios.post('http://localhost:8080/auth/sign-in', {
      _user: username,
      _pass: password
    })

    if (res.data.respond == '1001') {//Success
      await Cookies.set('token', res.data.token);
      history.push("/about");
    } else if (res.data.respond == '1003') {//Wrong User or Pass
      swal('Wrong username or password', '', 'warning')
    } else if (res.data.respond == '1002') {//Server Error
      swal('Server error please contract support', '', 'error')
    }
  }
  return (

    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Username"
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={login}
            className={classes.submit}
          >
            Sign In

          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}