require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect("mongodb://localhost/connect-back-front", {
    useCreateIndex: true,
    useNewUrlParser: true,
    userUnifiedTopology: true
}).then(onfulfilled => {
    console.log(`Connected: ${onfulfilled.connections[0].name}`);
}).catch(reason => console.log(`Error: ${reason}`));

var app = express();

// Se le especifica a la app desde dónde recibir peticiones
// * significa desde cualquier lugar
// Si se van a utilizar cookies, es necesario habilitar la opción
app.use(cors({
    origin: ["http://localhost:3001"],
    credentials: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Se ligan los archivos de routes con una ruta en particular, primero se especifica el archivo...
const indexRouter = require('./routes/index');
const productsRouter = require("./routes/products")
const authRoute = require("./routes/auth");
// ... y luego se especifica la ruta relativa que va a procesar cada uno:
app.use('/', indexRouter);
app.use("/products", productsRouter);
app.use('/', authRoute);

module.exports = app;
