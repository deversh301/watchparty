const {
  create,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateUser,
  deleteUser
} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Ajv = require("ajv")
const ajv = new Ajv({allErrors: true})

//validation
const schema = {
  type: "object",
  properties: {
    email: {type: "string"},
  },
  required: ["email"],
  additionalProperties: true,
}

const validate = ajv.compile(schema)



function createUser(req, res){
  const valid = validate(req.body)
  if (!valid){
    return res.json({
      success: 0,
      data: ajv.errorsText(validate.errors)
    });

  } 
  const body = req.body;
  const salt = genSaltSync(10);
  getUserByUserEmail(body.email, (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    if (results) {
          results.password = undefined;
          const jsontoken = sign({ result: results }, "newlogin", {
            expiresIn: "120h"
          });
          //console.log('fdfd')
         // console.log(results)
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken,
            data: results
          });
    }else{
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
      getUserByUserEmail(body.email, (err, results) => {
        if (err) {
          console.log(err);
        }
        
        if (!results) {
          return res.json({
            success: 0,
            data: "Invalid email or password"
          });
        } else{
          results.password = undefined;
          const jsontoken = sign({ result: results }, "newlogin", {
            expiresIn: "24h"
          });
          
          return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken,
            data: results
          });
        }
        
      });
      });
    }
  });
  
}






module.exports = {
  createUser ,
  login: (req, res) => {
    console.log('hii')
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "24h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateUsers: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record Not Found"
        });
      }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  }
};
