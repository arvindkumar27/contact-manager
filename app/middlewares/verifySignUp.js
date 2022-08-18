const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Role = db.role;

// check and verify Username and email already exists or not
checkDuplicateUsernameOrEmail = (req, res, next) => {
    if (req.body.roles) {
        req.body.roles =  JSON.parse(req.body.roles);
    }
    console.log("--------2-------- \n");
    console.log("---", req.body);
  // verify Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    // verify Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }
      next();
    });
  });
};

//verify roles is exists in array or not
checkRolesExisted = async (req, res, next) => {
   /*  let roles = await Role.find();
    roles = roles.map(role => role._id)
    console.log("role", role) */
  
  //using role 
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }
  next();
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};
module.exports = verifySignUp;