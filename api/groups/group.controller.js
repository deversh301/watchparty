const {
   create, getgroupDetails , updateCode
} = require("./group.service");

function  create_group( req, res){
    //const usertoken = req.headers.authorization
   // console.log(usertoken)
    console.log('dsdsa')
    const body = req.body;
    create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        } else{

            getgroupDetails(body.user_id , (err, results) =>{
                if (results) {
                    return res.json({
                        success: 1,
                        //message: "login successfully",
                        //token: jsontoken,
                        data: results
                      });
                }
            })
          
        }
    });


      
 
} 

function  update_url( req, res){
    
    const body = req.body;
    updateCode(body , (err, results) =>{
        if (results) {
            return res.json({
                success: 1,
                //message: "login successfully",
                //token: jsontoken,
               // data: results
              });
        }
    })
} 

module.exports = { create_group , update_url}