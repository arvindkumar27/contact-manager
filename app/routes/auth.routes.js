const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    console.log("--------3-------- \n");

    app.post(
        "/api/signup", //api url path
        [
            verifySignUp.checkDuplicateUsernameOrEmail, //check duplicate username and email
            verifySignUp.checkRolesExisted // check Role exixts in system
        ], // middelware
        controller.signup // signup action 
    );
    app.post(
        "/api/signin", // api URL path 
        controller.signin // signin action
    );
};