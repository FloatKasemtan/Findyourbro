import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';
import axios from 'axios';
import { userContext } from '../Contexts/userContext';


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
    const { profile } = useContext(userContext);
    const [foundPeer, setFoundPeer] = useState();
    const [senior, setSenior] = useState();
    const [code, setcode] = useState('');
    const classes = useStyles();
    const getFoundPeer = async () => {
        const res = await axios.get('http://localhost:8080/junior/getFoundPeer', { params: { student_id: profile.student_id } });
        setFoundPeer(res.data.foundPeer);
    }
    const getSeniorData = async () => {
        const res = await axios.get('http://localhost:8080/senior', { params: { student_id: profile.student_id } });
        setSenior(res.data.senior.firstName);
    }
    useEffect(() => {
        getFoundPeer();
        getSeniorData()
    }, [])
    const submit = async () => {
        console.log(code.length);
        if (code.length === 6) {
            const res = await axios.post('http://localhost:8080/junior/find-mentor', {
                student_id: profile.student_id,
                pairSeniorCode: code
            });
            if (res.data.respond == '1001') {
                swal("Congrat!", "You found your senior!", "success");
                getFoundPeer();
            } else if (res.data.respond == '1004') {
                swal("This code is not belong to anyone!", "You could enter wrong code", "error");
            } else if (res.data.respond == '1003') {
                swal("Wrong person!!!", `Try another person!, You have ${res.data.quota} chance left`, "warning");
            } else if (res.data.respond == '1005') {
                swal("You have no more quota left", `Better luck next time!`, "error");
            } else if (res.data.respond == '1002') {
                swal("Server error, please contact support!", '', "error");
            } else {
                swal("Unknow error!", '', "error");
            }
        } else {
            swal("Please enter 6 digits code!", '', "warning");
        }
    };
    return foundPeer ? (
        <div className={classes.container}>

            <h1 style={{ color: '#FE6B8B' }} className={classes.text} >Congrats you found your PeerSenior!</h1>
            <h2 style={{ color: '#FE6B8B' }} className={classes.text}>It's {senior}</h2>

        </div >
    ) :
        (
            <div className={classes.container}>
                <Zoom in={true} timeout={900}>
                    <h1 style={{ color: '#FE6B8B' }} className={classes.text} >Guess your senior</h1>

                </Zoom>
                <TextField color='secondary' className={classes.textField} id="standard-basic" onChange={(e) => setcode(e.target.value)} inputProps={{ min: 0, style: { textAlign: 'center', fontSize: '2em' } }} />
                <Button className={classes.btn} onClick={submit}>submit</Button>
            </div >
        )
}

export default About;