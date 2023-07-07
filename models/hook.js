const pool = require('../utils/db');
const mssql = require('mssql');

async function getGroup(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);
        let data = await request.query('SELECT GroupNo FROM GroupData WHERE Unit = @unit');

        if (unit == '') {
            data = await request.query('SELECT GroupNo FROM GroupData')
        }

        return data.recordset;
    } catch (error) {
        console.log(error);
        return ({ message: '伺服器錯誤' });
    } finally {
        pool.close();
    }
}

async function getUnit() {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        let data = await request.query('SELECT Unit FROM GroupData GROUP BY Unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return ({ message: '伺服器錯誤' });
    } finally {
        pool.close();
    }
}

async function getLSStatus(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);
        
        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT GroupNo, LiftMember, StorageMember FROM HookGroup WHERE unit = @unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return ({ message: '伺服器錯誤' });
    } finally {
        pool.close();
    }
}

async function getLiftCount(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT LiftNo FROM Lift WHERE Unit = @unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return ({ message: '伺服器錯誤' });
    } finally {
        pool.close();
    }
}

async function getStorageCount(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT StorageNo FROM Storage WHERE Unit = @unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    } finally {
        pool.close();
    }
}

module.exports = {
    getGroup,
    getUnit,
    getLSStatus,
    getLiftCount,
    getStorageCount,
};
