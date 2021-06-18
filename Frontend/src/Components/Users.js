import React, { useState, useContext, useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import { userContext } from '../Contexts/userContext';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: '50vw',
        justifySelf: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '95vh'
    },
    content: {
        marginLeft: 10,
        width: '40vw',
        height: 20
    }
});

const Users = () => {
    const { profile, reload } = useContext(userContext);
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        reload()
        setTimeout(() => {
            setLoading(true);
        }, 2000);
    }, [])

    return (
        <div className={classes.container}>
            <Fade in={true} timeout={900}>
                <Card className={classes.root}>
                    <CardContent>
                        <h2 style={{ marginLeft: 30 }}>Users Info</h2>
                        {loading ? <div className={classes.content}>Name : {profile.firstName} {profile.lastName}</div> : <div className={classes.content}><Skeleton /></div>}
                        {loading ? <div className={classes.content}>Student ID : {profile.student_id}</div> : <div className={classes.content}><Skeleton /></div>}
                        {loading ? <div className={classes.content}>Quota : {profile.quota}</div> : <div className={classes.content}><Skeleton /></div>}
                    </CardContent>
                </Card >
            </Fade>
        </div>
    );
}

export default Users;