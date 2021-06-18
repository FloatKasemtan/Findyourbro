import React, { useEffect, useContext } from 'react';
import Navbar from "../Components/Navbar"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { userContext } from '../Contexts/userContext';
const useStyles = makeStyles({
    container: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
    }
});

const Layout = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();
    const { profile } = useContext(userContext)
    useEffect(() => {
        if (profile.student_id === '') {
            history.push("/");
        }
    }, [])
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