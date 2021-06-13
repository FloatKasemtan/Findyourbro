import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    navbar: {
        background: 'red',
    }
});

const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <nav className={classes.navbar}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Link to="/">Home</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/about">About</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Link to="/users">Users</Link>
                    </Grid>
                </Grid>
            </nav>
        </div>
    )
}

export default Navbar;