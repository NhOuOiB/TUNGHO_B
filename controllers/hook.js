const hookModel = require('../models/hook');

async function getGroup(req, res) {
    let unit = req.query
    let data = await hookModel.getGroup(unit);
    res.json(data);
}

async function getUnit(req, res) {
    let data = await hookModel.getUnit();
    res.json(data);
}

async function getLSStatus(req, res) {
    let unit = req.query
    let data = await hookModel.getLSStatus(unit);
    res.json(data);
}

async function getLiftCount(req, res) {
    let unit = req.query
    let data = await hookModel.getLiftCount(unit);
    res.json(data);
}

async function getStorageCount(req, res) {
    let unit = req.query
    let data = await hookModel.getStorageCount(unit);
    res.json(data);
}

module.exports = {
    getGroup,
    getUnit,
    getLSStatus,
    getLiftCount,
    getStorageCount,
};