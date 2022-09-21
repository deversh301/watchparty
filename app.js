const express = require('express');
const db = require('./database/db')
const app = express();
const http = require('http');
const cors = require('cors')
const server = http.createServer(app);
const port = process.env.PORT || 8000
const mongodb = require('mongodb');


app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));
let routes = require('./routes/route.js');
app.use(express.json());
app.use(cors())
const { Server } = require("socket.io")
const io = new Server(server ,  {
  cors: {
    origin: ["http://192.168.1.5:3000", "http://192.168.1.4:3000" , "http://192.168.1.3:3000" ,"http://watchpartyyoutube.epizy.com","http://localhost:3000"],
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
  
    let user_ids;
    let group_code;
    socket.on('disconnect', (socket) => {
       console.log('an user deleted')
       remove_user_in_group(user_ids)
       ///  console.log('user_removed emision done')
       io.to(group_code).emit('user_removed', {user_ids:user_ids}
      );
   })


    socket.on('join', function (data) {
       console.log('join_got_in_server')
      //console.log(data.emit_from_clint)
    ///  console.log(data.group_code)
      socket.join(data.group_code); // We are using room of socket io
      group_code = data.group_code
      user_ids = data.sender_id 
      let socket_id = Math.floor(Math.random() * 1000000000);
      io.in(data.group_code).emit('send_pointer', {pointer:data.emit_from_clint , 
          user_id:data.sender_id , player_state:data.player_state , socket_id: socket_id  }
      );
    });

      socket.on('chat_message', function (data ) {
       console.log('chat_got_in_server')
        // if(data.data){
     /////   console.log('emission done'+socket.id)
        
        io.to(data.group_code).emit('chat_send', {chatmessage:data.chatmessage , 
            sender_id:data.sender_id , socket_id:socket.id , username:data.username}
          );
        // }
      });


      socket.on('leaving_group', function (data ) {
       remove_user_in_group(data.user_ids)
       console.log('user_removed emision done')
       io.to(data.group_code).emit('user_removed', {user_ids:user_ids}
       );
      });





});


async function  remove_user_in_group(id){
  try {
    const group_members = db.database.collection("group_members");
    const result = await group_members.deleteOne({_id:  new mongodb.ObjectId(id)});
  /////  console.log(result)
  } catch (e){
         ////// console.log('errror found'+e)
  }
} 

server.listen(port, () => {
  console.log('listening on *:8000');
});


