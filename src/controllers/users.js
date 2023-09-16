const bcrypt = require("bcrypt");
const jwtAuth = require("./jwtAuth");
const db = require("../db");
const model = db.model("user");
const {ROLE} =require('../const/app_role') 
const h = require("../helper");




const login = async (params) => {
  // if (h.isEmpty(params)) throw "Email and Password are required for login";

  if (!params.password) throw "Password not provided";
  if (!params.email) throw "Invalid Email address";

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!reg.test(params.email)) throw "Invalid Email address";

  let user = await model.findOne({
    where: { Email: { [db.Op.eq]: params.email }, Active: 1},
  });

  if (!user) {
    throw "Invalid Email/Password";
  }

  // verify password
  const match = await bcrypt.compare(params.password, user.Password);
  if (!match) throw "Invalid Email/Password";
  
  // create JWT token
  const accessToken = jwtAuth.sign({
    email: user.Email,
    role: user.Role,
    userID: user.UserID,
    name: user.FullName,
   
  });

  return {
    email: user.Email,
    role: user.Role,
    name: `${user.FullName}`,
    token: accessToken,
  };
};
const register = async (params) => {
  if (h.isEmpty(params)) throw "param is empty or not provided";
  if (!params.fullName) throw "Full Name is required";
  if (!params.email) throw "Email is required";    
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!reg.test(params.email)) throw "Invalid Email address";
  if (!params.password) throw "Password length must min. 8 char. long";
  if (params.password && params.password.trim().length < 8) throw "Password length must min. 8 char. long";

  // hash password
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  let _params = {
    FullName: params.fullName,
    Email: params.email,
    Active: 1,
    Password: params.password,
    Role: ROLE.Customer,
  };
 

  await model.create(_params);

  return "User created successfully";
};


/*
 verify token and get user related data
*/
const verifyToken = async (params) => {
  let user = null;

  if (params.body && params.body.token) {
    user = await jwtAuth.verify(params.body.token);

    if (user) {
      return {
        id: user.id,
        role: user.role,
        email: user.email,
        name: user.name,
        token: params.body.token,
        type: user.type,
      };
    } else {
      return null;
    }
  } 
  
};








module.exports = {
  login,
  register,
  verifyToken,

};
