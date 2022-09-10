const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
let routes = require('./routes/route.js');
app.use('/', routes);

//socket io used for sending the timings of youtube videos
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
         io.emit('send_pointer', msg);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});