require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const moment = require('moment');
const port = process.env.SERVER_PORT || 3001;

const http = require('http');
const server = http.createServer(app);

const login = require('./routers/login');
const hook = require('./routers/hook');

const corsOptions = {
    // 如果要讓 cookie 可以跨網域存取，這邊要設定 credentials
    // 且 origin 也要設定
    credentials: true,
    origin: ['http://localhost:5173', 'http://192.168.1.108:8001'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    console.log(`Now：${moment().format('YYYY-MM-DD h:mm:ss')}`);
    next();
});

app.use('/api/', login);
app.use('/api/', hook);

server.listen(port, () => console.log('server is runing : ' + port));
