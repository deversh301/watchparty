const pool = require("../../migration.js");

function create(data, callBack){
   const group_code =  Math.floor(10000 + Math.random() * 90000)
    pool.query(
        `insert into group_codes( user_id , group_code, url, status, is_expired) 
                  values(?,?,?,?,?)`,
        [
        
        data.user_id , group_code, '' , 1 ,0
          //data.number
        ],
        (error, results) => {
          if (error) {
           //c console.log(error)
            callBack(error);
          }
          //const final_result = { 'user_id' : data.user_id , 'group_code' : group_code }
         // console.log(results)
          return callBack(null, results);
        }
    );
}


function  updateCode (data, callBack)  {
    console.log(data)
    pool.query(
      `update group_codes set url=  ?  where group_code = ?`,
      [
        data.url,
        data.group_code
      ],
      (error, results) => {
        if (error) {
         //c console.log(error)
          callBack(error);
        }
        //const final_result = { 'user_id' : data.user_id , 'group_code' : group_code }
       // console.log(results)
        return callBack(null, results);
      }
    ) 
  }



function getgroupDetails (email, callBack) {
    pool.query(
      `select * from group_codes where user_id = ? ORDER BY id DESC`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

module.exports = { create , getgroupDetails , updateCode}