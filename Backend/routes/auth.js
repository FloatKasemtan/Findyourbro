const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const juniorSchema = require('../models/junior');

// 1001 = success
// 1002 = user fault
// 1003 = server fault

router.post('/sign-up', async (req, res) => {
    const junior = new juniorSchema({
        student_id: req.body.student_id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        _user: req.body._user,
        _pass: req.body._pass,
        quota: req.body.quota,
        pairSeniorCode: req.body.pairSeniorCode,
    });
    try {
        await junior.save();
        res.send({ respond: '1001' });
    } catch (err) {
        res.send({ respond: '1003' });
        console.log(err);
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const user = await juniorSchema.findOne({ '_user': req.body._user, '_pass': req.body._pass });
        var token = jwt.sign({ student_id: user.student_id, firstName: user.firstName, lastName: user.lastName, quota: user.quota }, 'shhhhh');
        if (user) {
            res.send({ respond: '1001', token: token });
        }
        res.send({respond: '1002'});
    }catch(err){
        res.send({respond: '1003'});
    }
});

router.get('/', (req, res) => {
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded.foo);
    res.send(decoded.foo);
})

module.exports = router;