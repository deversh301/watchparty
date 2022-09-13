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
                console.log(result)
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
                 console.log(req.params.id)
                 const haiku = db.database.collection("videos_url");
                 const query = { 'group_code': req.params.id };
                 const options = {};
                 const result = await haiku.findOne(query, options);
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

module.exports = { create_group , get_group , add_members_in_group}