import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    logoutBtn: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const btnText = {color: 'red'}
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
                    }).then(() => {
                        history.push("/");
                        swal({
                            title: "Successfully logout!",
                            icon: "success",
                            buttons: true,
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
        console.log(value);
    }, [value])
    return (
        <div>
            <nav className={classes.navbar}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction style={btnText} label="Guess" value="Guess" icon={<SearchIcon color='secondary' className={classes.icon} />} />
                    <BottomNavigationAction style={btnText} label="Your info" value="Your info" icon={<AccountCircleIcon color='secondary' />} />
                </BottomNavigation>
                <Button style={{ position: 'absolute', right: 50, top: 15 }} color="secondary" onClick={logout}><div className={classes.logoutBtn}><ExitToAppIcon color='secondary' className={classes.icon} /><p style={{ margin: '0 0 0 0' }}>Logout</p></div> </Button>
            </nav>


        </div>
    )
}

export default Navbar;