require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const { request } = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

// custom routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")



// initialize the express server
const app = express();

// connecting the database
mongoose.connect("mongodb+srv://admin:admin@cluster0.wykwx.mongodb.net/store?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED")
})

// using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);


app.get('/',(req,res)=>{
    res.send("welcome to heroku")
})

//PORT
const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`server running at http://localhost:${port}`)
})

