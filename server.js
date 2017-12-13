'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('helmet')());
app.use(cors({origin: '*'}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});
// const options = {
//     key: fs.readFileSync('privkey.pem'),
//     cert: fs.readFileSync('fullchain.pem'),
//     requestCert: false,
//     rejectUnauthorized: false
// };

const server = app.listen(8000);
const io = require('socket.io').listen(server, {
    log: false,
    agent: false,
    origins: '*:*',
    transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
});

// http.createServer(server).listen(8000);
// https.createServer(options, server).listen(8443);

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('add-message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});