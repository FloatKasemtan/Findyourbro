const express = require('express');
const router = express.Router();
const seniorSchema = require('../models/senior');
const juniorSchema = require('../models/junior');

router.post('/', async (req, res) => {
    try {
        const senior = await seniorSchema.findOne({ 'student_id': req.body.student_id });
        if (!senior) {
            let senior = new seniorSchema({
                student_id: req.body.student_id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                pairSeniorCode: req.body.pairSeniorCode,
                pairingCode: req.body.pairingCode
            });
            try {
                await senior.save()
                res.send({ respond: '1001' });
            } catch (err) {
                res.send({ respond: '1002' });
                console.log(err);
            }
        }
        res.send({ respond: '1003' })//Already have this studentID
    } catch (err) {
        res.send({ respond: '1002' });
        console.log(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const junior = await juniorSchema.findOne({ 'student_id': req.query.student_id });
        const senior = await seniorSchema.findOne({ 'pairSeniorCode': junior.pairSeniorCode });
        res.send({ respond: '1001', senior: senior });
    } catch (err) {
        res.send({ respond: '1002' });
        console.log(err);
    }
});

module.exports = router;