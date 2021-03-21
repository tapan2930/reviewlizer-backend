require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const { request } = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");

// custom routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")

//
let connectionStatus = "null"


// initialize the express server
const app = express();

// connecting the database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=> {
    console.log("DB CONNECTED")
    connectionStatus = "DB Connected"
}).catch((e)=>{
    console.log(e)
})

// using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);


app.get('/', (req,res)=>{
    res.send(connectionStatus)
})


//PORT
const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(`server running at http://localhost:${port}`)
})

