import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const useStyles = makeStyles({
    btn: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        marginTop: 50,
        transition: '0.5s',
        '&:hover': {
            transform: 'scale(1.2)'
        },
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '95vh'
    },
    textField: {
        width: '20vw',
    },
});

const About = () => {
    const classes = useStyles();
    const submit = () => {
        if (true) {
            swal("Good job!", "You clicked the button!", "success");
        } else if (true) {
            swal("Good job!", "You clicked the button!", "error");
        } else {
            swal("Good job!", "You clicked the button!", "warning");
        }
    };
    return (
        <div className={classes.container}>
            <Zoom in={true} timeout={900}>
                <h1 style={{ color: '#FE6B8B' }} className={classes.text} >Guess your senior</h1>

            </Zoom>
            <TextField color='secondary' className={classes.textField} id="standard-basic" />
            <Button className={classes.btn} onClick={submit}>submit</Button>
        </div >
    );
}

export default About;