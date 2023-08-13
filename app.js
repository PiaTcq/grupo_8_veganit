const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");


const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const session = require("express-session")

app.use(session({
    secret: "buizel",
    resave: false,
    saveUninitialized: false
}))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,'/public')));

app.use("/", homeRoutes);

app.use("/users", userRoutes);

app.use("/products", productsRoutes);



app.listen(3000, function(){
    console.log("Servidor Corriendo")
});


