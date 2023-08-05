//const loginRoutes = require("./routes/loginRoutes");
//const registerRoutes = require("./routes/registerRoutes");
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const productsRoutes = require("./routes/productsRoutes");
//const productoRoutes = require("./routes/productoRoutes");
//const carritoRoutes = require("./routes/carritoRoutes");

const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const app = express();

//agregado recientemente
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname,'/public')));

app.use("/", homeRoutes);

app.use("/users", userRoutes);

app.use("/products", productsRoutes);
//./partials/footer
//app.use("/login", loginRoutes);

//app.use("/register", registerRoutes);

//app.use("/producto", productoRoutes);

//app.use("/carrito", carritoRoutes);



app.listen(3000, function(){
    console.log("Servidor Corriendo")
});


