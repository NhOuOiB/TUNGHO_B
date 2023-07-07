const express = require('express');
const router = express.Router();
const hookController = require('../controllers/hook');

router.get('/getGroup', hookController.getGroup)

router.get('/getUnit', hookController.getUnit)

router.get('/getLSStatus', hookController.getLSStatus)

router.get('/getLiftCount', hookController.getLiftCount)

router.get('/getStorageCount', hookController.getStorageCount)

module.exports = router;
