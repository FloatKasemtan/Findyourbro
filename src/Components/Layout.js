import React, { useState } from 'react';
import Navbar from "../Components/Navbar"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        position: 'absolute'
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <>
            <div>
                <Navbar></Navbar>
            </div>
            <main>{children}</main>
        </>
    )
}

export default Layout;