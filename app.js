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
    origin: ["/*"],
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
       console.log(data)
       add_if_not_exist(data);
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
            sender_id:data.sender_id , socket_id:socket.id , username:data.username , type:data.type}
          );
        // }
      });


      socket.on('leaving_group', function (data ) {
       remove_user_in_group(data.user_ids)
       console.log('user_removed emision done')
       io.to(data.group_code).emit('user_removed', {user_ids:user_ids}
       );
      });

    
       socket.on('refresh_page', function (data ) {
       remove_user_in_group(data.group_code)
       console.log('refresh emits')
       io.to(data.group_code).emit('refresh_page', {group_code:data.group_code}
       );
      });





});

async function add_if_not_exist(data){
  try{
                  const haiku = db.database.collection("group_members");
                  
                 // create a filter for a movie to update
   		 const filter = { '_id': new mongodb.ObjectId(data.sender_id)};
   	         // this option instructs the method to create a document if no documents match the filter
    		 const options = { upsert: true};
    		 // create a document that sets the plot of the movie
   		 const updateDoc = {
   		   $set:{ 'group_code': data.group_code ,  username: data.username  },
    		};
    		const result = await haiku.updateOne(filter, updateDoc, options);
                console.log(result)
    
   }catch(e){
    	console.log('errror found'+e)
   }
}


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

