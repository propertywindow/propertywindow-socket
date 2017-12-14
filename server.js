'use strict';

const bodyParser = require('body-parser');
const socket = require('socket.io');
const express = require('express');
const corser = require('cors');
const path = require('path');

class Server{

    constructor(){
        this.port =  process.env.PORT || 8000;
        this.app = express();
        this.io = socket.listen(this.app.listen(this.port), {
            log: false,
            agent: false,
            origins: '*:*',
            transports: ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling']
        });
    }

    config(){
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );

        this.app.use(
            bodyParser.json()
        );

        this.app.use(
            require('helmet')()
        );

        this.app.use(
            corser({
                origin: '*'
            })
        );

        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', false);
            next();
        });
    }

    routes(){
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'));
        });
    }

    execute(){
        this.config();
        this.routes();

        this.io.sockets.on("connection",function(socket){
            socket.emit("start_server");
        });

        this.io.on('connection', (socket) => {
            console.log('user connected');

            socket.on('add-message', (message) => {
                io.emit('message', message);
            });

            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });

        this.io.sockets.on("disconnect",function(socket){
            console.log('user disconnected (2)');
        });

        // this.io.sockets.emit("EVENT_NAME",EVENT_DATA);
        // //EVENT_DATA Can Be Anything That Is To Be Sent To The Server

        // this.io.sockets.on("EVENT_NAME",function(data){
        // //data = EVENT_DATA Passed From The emit Method
        // })
    }

}

const app = new Server();
app.execute();
