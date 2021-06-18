const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const juniorSchema = require('../models/junior');
const seniorSchema = require('../models/senior');

router.post('/sign-up', async (req, res) => {
    try {
        if (await juniorSchema.findOne({ "_user": req.body._user })) {
            res.send({ respond: '1003' }) //Username has been used
        }
        const senior = await seniorSchema.findOne({ 'pairingCode': req.body.pairingCode });
        if (senior) {
            const junior = new juniorSchema({
                student_id: req.body.student_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                _user: req.body._user,
                _pass: req.body._pass,
                quota: 6,
                pairSeniorCode: senior.pairSeniorCode,
                foundPeer: false
            });
            try {
                await junior.save();
                res.send({ respond: '1001' });
            } catch (err) {
                res.send({ respond: '1002', error: err });
            }
        }
        res.send({ respond: '1004' })// No senpai in database
    } catch (err) {
        res.send({ respond: '1002', error: err });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const user = await juniorSchema.findOne({ '_user': req.body._user, '_pass': req.body._pass });
        if (user) {
            var token = jwt.sign({ student_id: user.student_id, firstName: user.firstName, lastName: user.lastName, quota: user.quota, foundPeer: user.foundPeer }, 'shhhhh');
            console.log('logined');
            return res.send({ respond: '1001', token: token });
        }
        res.send({ respond: '1003' });
        console.log('Wrong Pass');
    } catch (err) {
        res.send({ respond: '1002' });
        console.log(err);
    }
});

module.exports = router;