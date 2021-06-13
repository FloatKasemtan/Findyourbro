import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    useHistory
} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    navbar: {
        height: '5vh'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let history = useHistory();
    useEffect(() => {
        if (value === 'Guess') {
            history.push("/about");
        } else if (value === 'Your info') {
            history.push("/users");
        } else if (value === 'Logout') {
            history.push("/");
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
                    className={classes.root}
                >
                    <BottomNavigationAction label="Guess" value="Guess" icon={<SearchIcon color='secondary' className={classes.icon} />} />
                    <BottomNavigationAction label="Your info" value="Your info" icon={<AccountCircleIcon color='secondary' />} />
                    <BottomNavigationAction label="Logout" value="Logout" icon={<ExitToAppIcon color='secondary' className={classes.icon} />} />
                </BottomNavigation>

            </nav>
        </div>
    )
}

export default Navbar;