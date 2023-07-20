const express = require('express');
const router = express.Router();
const hookController = require('../controllers/hook');

router.get('/getGroup', hookController.getGroup)

router.get('/getUnit', hookController.getUnit)

router.get('/getLSStatus', hookController.getLSStatus)

router.get('/getLift', hookController.getLift)

router.get('/getStorage', hookController.getStorage)

router.get('/getIdleLift', hookController.getIdleLift)

router.get('/getIdleStorage', hookController.getIdleStorage)

router.get('/getProduct', hookController.getProduct)

router.get('/getLiftByNo', hookController.getLiftByNo)

router.get('/getStorageByNo', hookController.getStorageByNo)

router.get('/getHooks', hookController.getHooks)

router.get('/getHook', hookController.getHook)

router.put('/updateLS', hookController.updateLS)

router.put('/updateLiftStatus', hookController.updateLiftStatus)

router.put('/updateStorageStatus', hookController.updateStorageStatus)

router.put('/resetHookPair', hookController.resetHookPair)

router.post('/addGroup', hookController.addGroup)

router.delete('/deleteGroup', hookController.deleteGroup)

module.exports = router;
