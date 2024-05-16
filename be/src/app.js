const express = require("express");
const app = express()
const db = require("./config/database");
const { productRouter } = require("./routes/productRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors())

db.authenticate().then(()=>{console.log("Database is connected");}).catch(err=>{console.log("Error in connecting to database:",err);})

app.use("/product",productRouter);


module.exports = app;