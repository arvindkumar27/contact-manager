const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv').config().parsed; 

const app = express();
var corsOptions = {
    origin: "http://localhost:7071"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//db connection and initialize
const db = require("./models");
const Role = db.role;

db.mongoose
    .connect(`mongodb://${dotenv.DB_HOST}:${dotenv.DB_PORT}/${dotenv.DB_NAME}`, {    
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// db initialization with Role    
function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/contact.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT;
console.log(`Your port is ${PORT} \n`); 
console.log(`----------------------------- \n`);
//console.log("dotenv \n", dotenv);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});