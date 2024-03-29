const express = require('express');
const router = express.Router();
const ctrls = require('../controllers');

router.get('/allJobs', ctrls.job.getJobs)
router.post('/', ctrls.job.postJobs)
router.delete('/deleteAll', ctrls.job.deleteAllJobs)

module.exports = router;