const pool = require('../utils/db');
const mssql = require('mssql');

async function getGroup(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);
        let data = await request.query('SELECT GroupNo FROM GroupData WHERE Unit = @unit ORDER BY GroupNo');

        if (unit == '') {
            data = await request.query('SELECT GroupNo FROM GroupData');
        }

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
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
        return { message: '伺服器錯誤' };
    }
}

async function getLSStatus(merge) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, merge.unit);
        request.input('group', mssql.VarChar, merge.groupNo);

        let data = await request.query(
            'SELECT GroupNo, ProductNo ,LiftMember, StorageMember FROM HookGroup WHERE Unit = @unit AND GroupNo = @group'
        );
        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getLift(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT LiftNo, Status FROM Lift WHERE Unit = @unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getStorage(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT StorageNo, Status FROM Storage WHERE Unit = @unit');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getIdleLift(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT LiftNo FROM Lift WHERE Unit = @unit AND Status = 2');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getIdleStorage(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit.unit);

        let data = await request.query('SELECT StorageNo FROM Storage WHERE Unit = @unit AND Status = 2');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getProduct() {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        let data = await request.query('SELECT * FROM Product');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getLiftByNo(unit, liftNo) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('liftNo', mssql.VarChar, liftNo);

        let data = await request.query('SELECT LiftNo, Status FROM Lift WHERE Unit = @unit AND LiftNo = @liftNo');

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getStorageByNo(unit, storageNo) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('storageNo', mssql.VarChar, storageNo);

        let data = await request.query(
            'SELECT StorageNo, Status FROM Storage WHERE Unit = @unit AND StorageNo = @storageNo'
        );

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getHooks(unit) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);

        let data = await request.query(
            'SELECT * FROM Hook h LEFT JOIN Product AS p ON h.ProductNo = p.ProductNo WHERE Unit = @unit ORDER BY h.ProductNo DESC'
        );

        return data.recordset;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function getHook(unit, hookNo) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('hookNo', mssql.VarChar, hookNo);

        let hookData = await request.query(
            'SELECT * FROM Hook h LEFT JOIN Product AS p ON h.ProductNo = p.ProductNo WHERE Unit = @unit AND HookNo = @hookNo'
        );

        let HistoryData = await request.query(
            'SELECT TOP(5) * FROM HookHistory h LEFT JOIN Product AS p ON h.ProductNo = p.ProductNo WHERE Unit = @unit AND HookNo = @hookNo ORDER BY CreateTime DESC'
        );

        let data = [hookData.recordset, HistoryData.recordset];

        return data;
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function updateLS(unit, group, liftStart, liftStop, storageStart, storageStop, product) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        let lift = liftStart.join(';');
        let storage = storageStart.join(';');

        request.input('unit', mssql.VarChar, unit);
        request.input('group', mssql.VarChar, group);
        request.input('lift', mssql.VarChar, lift);
        request.input('storage', mssql.VarChar, storage);
        request.input('product', mssql.VarChar, product);
        let res = await request.query(
            'UPDATE HookGroup SET LiftMember = @lift, StorageMember = @storage, UpdateFlag = 1, ProductNo = @product WHERE Unit = @unit AND GroupNo = @group'
        );

        for (let i = 0; i < liftStart.length; i++) {
            request.input('liftStart' + i, mssql.VarChar, liftStart[i]);
            let liftRes = await request.query(
                `UPDATE Lift SET Status = 1 WHERE Unit = @unit AND LiftNo = @liftStart${i}`
            );
        }

        for (let i = 0; i < liftStop.length; i++) {
            request.input('liftStop' + i, mssql.VarChar, liftStop[i]);
            let liftRes = await request.query(
                `UPDATE Lift SET Status = 2 WHERE Unit = @unit AND LiftNo = @liftStop${i}`
            );
        }

        for (let i = 0; i < storageStart.length; i++) {
            request.input('storageStart' + i, mssql.VarChar, storageStart[i]);
            let storageRes = await request.query(
                `UPDATE Storage SET Status = 1 WHERE Unit = @unit AND StorageNo = @storageStart${i}`
            );
        }

        for (let i = 0; i < storageStop.length; i++) {
            request.input('storageStop' + i, mssql.VarChar, storageStop[i]);
            let storageRes = await request.query(
                `UPDATE Storage SET Status = 2 WHERE Unit = @unit AND StorageNo = @storageStop${i}`
            );
        }

        return { message: '更新成功' };
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function updateLiftStatus(unit, liftNo, status) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('liftNo', mssql.VarChar, liftNo);
        request.input('status', mssql.VarChar, `${status}`);

        let res = await request.query('UPDATE Lift SET Status = @status WHERE Unit = @unit AND LiftNo = @liftNo');

        return { message: '更新成功' };
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function updateStorageStatus(unit, storageNo, status) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('storageNo', mssql.VarChar, storageNo);
        request.input('status', mssql.VarChar, `${status}`);

        let res = await request.query(
            'UPDATE Storage SET Status = @status WHERE Unit = @unit AND StorageNo = @storageNo'
        );

        return { message: '更新成功' };
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function addGroup(unit, group, product, liftStart, storageStart) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        let lift = liftStart.join(';');
        let storage = storageStart.join(';');

        request.input('unit', mssql.VarChar, unit);
        request.input('group', mssql.VarChar, group);
        request.input('lift', mssql.VarChar, lift);
        request.input('storage', mssql.VarChar, storage);
        request.input('product', mssql.VarChar, product);

        let res = await request.query(
            'INSERT INTO HookGroup (Unit, GroupNo, ProductNo, LiftMember, StorageMember, UpdateFlag) VALUES (@unit, @group, @product, @lift, @storage, 1)'
        );

        let GroupData = await request.query('INSERT INTO GroupData (Unit, GroupNo) VALUES (@unit, @group)');

        for (let i = 0; i < liftStart.length; i++) {
            request.input('liftStart' + i, mssql.VarChar, liftStart[i]);
            let liftRes = await request.query(
                `UPDATE Lift SET Status = 1 WHERE Unit = @unit AND LiftNo = @liftStart${i}`
            );
        }

        for (let i = 0; i < storageStart.length; i++) {
            request.input('storageStart' + i, mssql.VarChar, storageStart[i]);
            let storageRes = await request.query(
                `UPDATE Storage SET Status = 1 WHERE Unit = @unit AND StorageNo = @storageStart${i}`
            );
        }

        return { message: '新增成功' };
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
}

async function deleteGroup(unit, group, liftStop, storageStop) {
    let connection = await pool.connect();
    try {
        const request = new mssql.Request(connection);

        request.input('unit', mssql.VarChar, unit);
        request.input('group', mssql.VarChar, group);

        let res = await request.query('DELETE FROM HookGroup WHERE Unit = @unit AND GroupNo = @group');
        let res1 = await request.query('DELETE FROM GroupData WHERE Unit = @unit AND GroupNo = @group');

        for (let i = 0; i < liftStop.length; i++) {
            request.input('liftStop' + i, mssql.VarChar, liftStop[i]);
            let liftRes = await request.query(
                `UPDATE Lift SET Status = 2 WHERE Unit = @unit AND LiftNo = @liftStop${i}`
            );
        }

        for (let i = 0; i < storageStop.length; i++) {
            request.input('storageStop' + i, mssql.VarChar, storageStop[i]);
            let storageRes = await request.query(
                `UPDATE Storage SET Status = 2 WHERE Unit = @unit AND StorageNo = @storageStop${i}`
            );
        }

        return { message: '刪除成功' };
    } catch (error) {
        console.log(error);
        return { message: '伺服器錯誤' };
    }
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
    addGroup,
    deleteGroup,
};
