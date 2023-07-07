const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const mssql = require('mssql');

router.post('/login', async (req, res) => {
    pool.connect(async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: '資料庫連接錯誤' });
        }

        try {
            const request = new mssql.Request(pool);
            request.input('account', mssql.VarChar, req.body.account);
            request.input('password', mssql.VarChar, req.body.password);
            let result = await request.query('SELECT * FROM account WHERE account = @account AND password = @password');
            let users = result.recordset;

            if (users.length == 0) {
                return res.status(401).json({ message: '信箱或密碼錯誤' });
            }

            let user = users[0];
            console.log(user);
            res.json({
                id: user.id,
                name: user.account,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: '伺服器錯誤' });
        } finally {
            pool.close();
        }
    });
});

module.exports = router;
