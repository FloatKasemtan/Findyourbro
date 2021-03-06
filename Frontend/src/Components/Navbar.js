import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    useHistory,
    Link
} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Cookies from 'js-cookie';
import { userContext } from '../Contexts/userContext';

const useStyles = makeStyles((theme) => ({
    navbar: {
        height: '5vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    btn: {
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
    },
    logoutBtn: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const { reload } = useContext(userContext);
    const [value, setValue] = React.useState('Guess');
    let history = useHistory();

    const logout = () => {
        swal({
            title: "Are you sure you want to logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                let timerInterval;
                if (willDelete) {
                    Swal.fire({
                        title: 'Loging you out!',
                        timer: 2000,
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                                const content = Swal.getHtmlContainer()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                        b.textContent = Swal.getTimerLeft()
                                    }
                                }
                            }, 100)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then(async () => {
                        await Cookies.remove('token');
                        reload();
                        history.push("/");
                        swal({
                            title: "Successfully logout!",
                            icon: "success",
                        })
                    })

                }
            });
    }
    useEffect(() => {
        if (value === 'Guess') {
            history.push("/about");
        } else if (value === 'Your info') {
            history.push("/users");
        }
    }, [value])
    return (
        <div>
            <nav className={classes.navbar}>
                <Link style={{ textDecoration: 'none' }} to='/about'>
                    <Button className={classes.btn} color="secondary" startIcon={<SearchIcon />}>
                        Guess
                    </Button>
                </Link>
                <Link style={{ textDecoration: 'none' }} to='/users'>
                    <Button className={classes.btn} color="secondary" startIcon={<AccountCircleIcon />} >
                        Your info
                    </Button>
                </Link>
                <Button style={{ position: 'absolute', right: 50, top: 15 }} color="secondary" onClick={logout}>
                    <div className={classes.logoutBtn}>
                        <ExitToAppIcon color='secondary' className={classes.icon} />
                        <p style={{ margin: '0 0 0 0' }}>Logout</p></div>
                </Button>
            </nav>


        </div >
    )
}

export default Navbar;