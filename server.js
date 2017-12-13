'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 8000;

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

const io = require('socket.io').listen(app.listen(port), {
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

io.sockets.on("disconnect",function(socket){
    console.log('user disconnected (2)');
});

// io.sockets.emit("EVENT_NAME",EVENT_DATA);
// //EVENT_DATA Can Be Anything That Is To Be Sent To The Server

// io.sockets.on("EVENT_NAME",function(data){
// //data = EVENT_DATA Passed From The emit Method
// })

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
