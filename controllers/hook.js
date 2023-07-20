const hookModel = require('../models/hook');

async function getGroup(req, res) {
    let unit = req.query;
    let data = await hookModel.getGroup(unit);
    res.json(data);
}

async function getUnit(req, res) {
    let data = await hookModel.getUnit();
    res.json(data);
}

async function getLSStatus(req, res) {
    let merge = req.query;
    let data = await hookModel.getLSStatus(merge);
    res.json(data);
}

async function getLift(req, res) {
    let unit = req.query;
    let data = await hookModel.getLift(unit);
    res.json(data);
}

async function getStorage(req, res) {
    let unit = req.query;
    let data = await hookModel.getStorage(unit);
    res.json(data);
}

async function getIdleLift(req, res) {
    let unit = req.query;
    let data = await hookModel.getIdleLift(unit);
    res.json(data);
}

async function getIdleStorage(req, res) {
    let unit = req.query;
    let data = await hookModel.getIdleStorage(unit);
    res.json(data);
}

async function getProduct(req, res) {
    let data = await hookModel.getProduct();
    res.json(data);
}

async function getLiftByNo(req, res) {
    let unit = req.query.unit;
    let liftNo = req.query.liftNo;
    let data = await hookModel.getLiftByNo(unit, liftNo);
    res.json(data);
}

async function getStorageByNo(req, res) {
    let unit = req.query.unit;
    let storageNo = req.query.storageNo;
    let data = await hookModel.getStorageByNo(unit, storageNo);
    res.json(data);
}

async function getHooks(req, res) {
    let unit = req.query.unit;
    let data = await hookModel.getHooks(unit);
    res.json(data);
}

async function getHook(req, res) {
    let unit = req.query.unit;
    let hookNo = req.query.hookNo;
    let data = await hookModel.getHook(unit, hookNo);
    res.json(data);
}

async function updateLS(req, res) {
    let unit = req.body.unit.unit;
    let group = req.body.group.groupNo;
    let product = req.body.product;
    let liftStop = req.body.liftStopArr;
    let liftStart = req.body.liftStartArr;
    let storageStop = req.body.storageStopArr;
    let storageStart = req.body.storageStartArr;
    let ressult = await hookModel.updateLS(unit, group, liftStart, liftStop, storageStart, storageStop, product);
    res.json(ressult);
}

async function updateLiftStatus(req, res) {
    let unit = req.body.unit;
    let liftNo = req.body.liftNo;
    let status = req.body.status;

    let ressult = await hookModel.updateLiftStatus(unit, liftNo, status);
    res.json(ressult);
}

async function updateStorageStatus(req, res) {
    let unit = req.body.unit;
    let storageNo = req.body.storageNo;
    let status = req.body.status;

    let ressult = await hookModel.updateStorageStatus(unit, storageNo, status);
    res.json(ressult);
}

async function resetHookPair(req, res) {
    let unit = req.body.unit;

    let ressult = await hookModel.resetHookPair(unit);
    res.json(ressult);
}

async function addGroup(req, res) {
    let unit = req.body.unit;
    let group = req.body.group;
    let product = req.body.product;
    let liftStart = req.body.liftStartArr;
    let storageStart = req.body.storageStartArr;

    let result = await hookModel.addGroup(unit, group, product, liftStart, storageStart);
    res.json(result);
}

async function deleteGroup(req, res) {
    let unit = req.query.unit;
    let group = req.query.group;
    let liftStop = req.query.liftStopArr;
    let storageStop = req.query.storageStopArr;

    let result = await hookModel.deleteGroup(unit, group, liftStop, storageStop);
    res.json(result);
}

module.exports = {
    getGroup,
    getUnit,
    getLSStatus,
    getLift,
    getStorage,
    getIdleLift,
    getIdleStorage,
    getProduct,
    getLiftByNo,
    getStorageByNo,
    getHooks,
    getHook,
    updateLS,
    updateLiftStatus,
    updateStorageStatus,
    resetHookPair,
    addGroup,
    deleteGroup,
};
