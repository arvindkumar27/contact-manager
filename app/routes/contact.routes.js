const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/contacts/",
        [authJwt.verifyToken],
        controller.getAllContacts
    );
    app.get("/api/contact/:id",
        [authJwt.verifyToken],
        controller.getContactById
    );
    app.post("/api/contact",
        [authJwt.verifyToken],
        controller.addContacts
    );
    app.put("/api/contact/:id",
        [authJwt.verifyToken],
        controller.updateContactById
    );
    app.delete("/api/contact/:id",
        [authJwt.verifyToken],
        controller.deleteContactById
    );
};