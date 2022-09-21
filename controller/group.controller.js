const db = require('../database/db');
//console.log(db.client)
async function  create_group(req , res ){
        try {
                const haiku = db.database.collection("videos_url");
                let group_code = makeid(5)
                // create a document to insert
                const doc = {
                        url: req.body.yt_url,
                        group_code: group_code,
                }
                const result = await haiku.insertOne(doc);
               //// console.log(result)
                res.json({'status':200 , 'group_code': group_code })
                // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } catch (e){
                console.log('errror found'+e)
                res.json({'status':500 , 'message': 'some error happens' })
        }
} 


async function add_members_in_group(req, res){
        try {
                const group_members = db.database.collection("group_members");
                // create a document to insert
                const doc = {
                        group_code: req.body.group_code ,
                        username: req.body.username
                }
                const result = await group_members.insertOne(doc);
                res.json({'status':200 , 'data': result })
                // console.log(`A document was inserted with the _id: ${result.insertedId}`);
        } catch (e){
                console.log('errror found')
                res.json({'status':500 , 'message': 'some error happens' })
        }
}


async function  get_group(req , res ){
        try {
               ////  console.log(req.params.id)
                 const haiku = db.database.collection("videos_url");
                 const query = { 'group_code': req.params.id };
                 const options = {};
                 const result = await haiku.findOne(query, options);
                ///// console.log(result)
                 res.json({'status':200 , 'data': result })
        } catch (e){
                console.log('errror found'+e)
                res.json({'status':500 , 'message': 'some error happens' })
        }
} 


async function  get_members(req , res ){
        try {
                ///// console.log(req.params.id)
                 const haiku = db.database.collection("group_members");
                 const query = { 'group_code': req.params.id };
                 const options = {};
                 const result = await haiku.find(query).toArray();;
                ////// console.log(result)
                 res.json({'status':200 , 'data': result })
        } catch (e){
                console.log('errror found'+e)
                res.json({'status':500 , 'message': 'some error happens' })
        }
} 


async function update_url_in_group(req, res){
      try {
                console.log(req.body)
                 const haiku = db.database.collection("videos_url");
                 const query = { 'group_code': req.body.id };
                 
                 // create a filter for a movie to update
   		 const filter = { 'group_code': req.body.groupcode  };
   	         // this option instructs the method to create a document if no documents match the filter
    		 const options = { upsert: false};
    		 // create a document that sets the plot of the movie
   		 const updateDoc = {
   		   $set: {
        		url: req.body.url
      		    },
    		};
    		const result = await haiku.updateOne(filter, updateDoc, options);
                 console.log(result)
                 res.json({'status':200 , 'data': result })
        } catch (e){
                console.log('errror found'+e)
                res.json({'status':500 , 'message': 'some error happens' })
        }
}


    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
                charactersLength));
       }
       return result;
    }

module.exports = { create_group , get_group , get_members,  update_url_in_group ,  add_members_in_group}