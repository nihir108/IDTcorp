const express = require("express");

const session = require('express-session');
const app = express();
const static = express.static(__dirname + "/public");


const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
app.use(static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(session({
    name: 'AuthCookie',
    secret: 'IDT corp',
    resave: false,
    saveUninitialized: true
  }))
  


configRoutes(app);


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});

