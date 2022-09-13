const express = require('express');
const db = require('./database/db')
const app = express();
const http = require('http');
const cors = require('cors')
const server = http.createServer(app);

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
let routes = require('./routes/route.js');
app.use(express.json());
app.use(cors())
const { Server } = require("socket.io")
const io = new Server(server ,  {
  cors: {
    origin: "http://localhost:3000",
    // or with an array of origins
    // origin: ["https://my-frontend.com", "https://my-other-frontend.com", "http://localhost:3000"],
    credentials: true
  }
});
app.use('/', routes);

// app.get('/', function(req , res){
//   res.render('home');
// })

//socket io used for sending the timings of youtube videos
io.on('connection', (socket) => {
    // socket.on('chat message', (msg) => {
    //     io.emit('send_pointer', msg);
    // });

    socket.on('join', function (data) {
      console.log(data.emit_from_clint)
      console.log(data.group_code)
      socket.join(data.group_code); // We are using room of socket io
      io.in(data.group_code).emit('send_pointer', data.emit_from_clint);
    });
});

server.listen(3000, () => {
  console.log('listening on *:8000');
});