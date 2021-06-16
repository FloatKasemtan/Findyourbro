import React from 'react';
import Navbar from "../Components/Navbar"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.container}>
                <Navbar></Navbar>
            </div>
            <main>
                {children}
                <div></div>
                
            </main>

        </div>
    )
}

export default Layout;