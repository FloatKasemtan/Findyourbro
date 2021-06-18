const express = require('express');
const router = express.Router();
const seniorSchema = require('../models/senior');
const juniorSchema = require('../models/junior');

router.post('/find-mentor', async (req, res) => {
    try {
        const user = await juniorSchema.findOne({ 'student_id': req.body.student_id });
        const senior = await seniorSchema.findOne({ 'pairSeniorCode': req.body.pairSeniorCode });
        if (user.quota > 0) {
            if (senior) {
                try {
                    if (senior.pairSeniorCode == user.pairSeniorCode) {
                        user.foundPeer = true;
                        await user.save();
                        res.send({ respond: '1001' });
                    }
                    user.quota--;
                    await user.save();
                    res.send({ respond: '1003', quota: user.quota }); //Wrong Senpai
                } catch (err) {
                    res.send({ respond: '1002' });
                    console.log(err);
                }
            }
            res.send({ respond: '1004' });//No one own this code
        }
        res.send({ respond: '1005' });//No more quota left
    } catch (err) {
        res.send({ respond: '1002' });
        console.log(err);
    }
});

module.exports = router;